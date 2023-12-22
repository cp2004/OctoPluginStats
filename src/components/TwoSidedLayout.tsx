"use client";

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import { typographyClasses } from '@mui/joy/Typography';


const AspectRatioBox = ({children, variant}: React.PropsWithChildren<{variant: 'plain' | 'outlined'}>)  => {
  return (
    <AspectRatio
      ratio={600 / 520}
      variant={variant}
      maxHeight={300}
      sx={(theme) => ({
        minWidth: 300,
        alignSelf: 'stretch',
        [theme.breakpoints.up(834)]: {
          alignSelf: 'initial',
          flexGrow: 1,
          '--AspectRatio-maxHeight': '520px',
          '--AspectRatio-minHeight': '400px',
        },
        borderRadius: 'sm',
        bgcolor: variant === 'outlined' ? 'background.level2' : undefined,
        flexBasis: '50%',
      })}
    >
      {children}
    </AspectRatio>
  )
}

export default function TwoSidedLayout(
  {left, right, reversed}: {left: React.ReactNode, right: React.ReactNode, reversed?: boolean }
) {
  return (
    <Container
      sx={(theme) => ({
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: reversed ? 'column-reverse' : 'column',
        alignItems: 'center',
        py: 10,
        gap: 4,
        [theme.breakpoints.up(834)]: {
          flexDirection: reversed ? 'row-reverse' : 'row',
          gap: 3,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 6,
        },
      })}
    >
      <AspectRatioBox variant={'plain'}>
        {left}
      </AspectRatioBox>
      <AspectRatioBox variant={'outlined'}>
        {right}
      </AspectRatioBox>
    </Container>
  );
}