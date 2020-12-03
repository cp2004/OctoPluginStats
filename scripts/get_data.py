import sys
if not sys.version_info.major == 3 and int(sys.version_info.minor) >= 7:
    print("Incompatible Python version, need 3.7+")
    sys.exit(-1)

import requests
import json
import time
import copy
import os
from typing import Dict, Union

# A list of plugin IDs to use
PLUGIN_IDS: list = [
    "ws281x_led_status",
    "eeprom_marlin",
]
DATA_URL: str = "https://data.octoprint.org/export/"
STATS_30_DAYS: str = DATA_URL + "plugin_stats_30d.json"
STATS_7_DAYS: str = DATA_URL + "plugin_stats_7d.json"

DATA: Dict[str, Dict[str, Union[int, str, list]]] = {}

# DATA STRUCTURE:
# {"plugin_id":
#   {
#       "total": 00,
#       "versions": {"0.1.0": 00, "0.2.0": 00}
#       "history": [
#           {"date": "2020-12-1", "total": 00, "versions": {"0.1.0": 00, "0.2.0": 00}},
#           "etc etc"
#       }
#   }
#  "etc...." for more plugins.

TODAY = time.strftime("%Y-%m-%d")

# Incremented for testing
# TODAY = "2021-01-02"


# Read current data (if any)
if os.path.isfile(os.path.abspath(os.path.join("data", "stats.json"))):
    print("Reading stored data")
    with open(os.path.abspath(os.path.join("data", "stats.json")), "rt") as file:
        DATA = json.load(file)

# Get the data
for URL in [STATS_30_DAYS]:
    response = requests.get(URL).json()

    # iterate through, find my plugins
    for plugin_id, plugin_data in response["plugins"].items():
        if plugin_id in PLUGIN_IDS:
            print("Processing data for {}".format(plugin_id))
            # Test plugin data exists
            try:
                existing_data = DATA[plugin_id]
            except KeyError:
                # Plugin not seen before, create the dict
                DATA[plugin_id] = {"total": 0, "versions": [], "history": []}

            plugin_stats = copy.deepcopy(DATA[plugin_id])
            plugin_stats["total"] = plugin_data["instances"]
            plugin_stats["versions"] = plugin_data["versions"]

            # Remove the 31st day, if relevant
            if len(plugin_stats["history"]) >= 30:
                # Check it's not been run more than once per day, latest data is not today.
                if plugin_stats["history"][29]["date"] != TODAY:
                    # remove earliest data
                    plugin_stats["history"].pop(0)

            if not len(plugin_stats["history"]) or (
                    len(plugin_stats["history"]) and plugin_stats["history"][-1]["date"]
            ) != TODAY:
                # Add the latest point to the history
                plugin_stats["history"].append(
                    {
                        "date": TODAY,
                        "total": plugin_data["instances"],
                        "versions": plugin_data["versions"]
                    }
                )

            # Put the data back
            DATA[plugin_id] = plugin_stats


# write back to the file
with open(os.path.abspath(os.path.join("data", "stats.json")), "wt") as file:
    json.dump(DATA, file)

print("Done!")