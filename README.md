# OctoPluginStats
Next.js site tracking my OctoPrint plugin statistics over time.

Built using Next.js, Material UI and React, powered by the data at https://data.octoprint.org/export

## Want to use this to track your own stats? Feel free!

This site is easily configured to how *you* would like it. With a little bit of configuration you can get runnning easily!

1. Fork this repository
2. Delete the file `data/stats.json` (delete, not empty) **or** replace with empty JSON (`{}`).
3. Edit the `configuration.js` file to your own stuff, including the list of plugin IDs and names.
   
   ⚠️ All IDs are lowercased by the tracking data scripts, use lowercase IDs here ⚠️
4. (TO BE REMOVED SOON) Edit the list of IDs in `scripts/get_data.py` - this will eventually be replaced by the global configuration file
5. Make sure you have enabled GitHub Actions in the repository settings, they are disabled (by default) for forks.
6. You can manually trigger the 'Get new data' action.

## Deploying to Vercel

Simple! Sign up for an account at https://vercel.com and connect this repository.

Make sure you change the default production branch to `deploy`:
![](https://user-images.githubusercontent.com/31997505/116289008-fb18d980-a789-11eb-98d3-1b74e58393e6.png)

Deploying to GitHub pages would take a bit more configuration to create the build, but it would be possible. Not investigated yet.

## Contributing

Using the above workflow, contributing should be easy. If you have changes you want to make upstream, feel free.
