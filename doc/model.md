# Calculus-Grapher - Model Description

@author Martin Veillette

This document is a high-level description of the model used in PhET's _Calculus-Grapher_ simulation.

The simulation comprise three screens: Intro, Integral Lab and Derivative Lab.

## _Intro_ Screen

The zoom control buttons are available on the left hand side of the integral, derivative, and second derivative graphs.
It will allow the user to upscale or downscale the y-axis.

The simulation includes a grid Checkbox. When checked, each graph will contain independent internal grids. The grids
will scale accordingly to the zoom level.

The simulation includes a reference line checkbox, indicated by a vertical line. When checked, the reference line will
appear in the play space. The reference line spans all the graph and the x-position of the reference line is controlled
by the user.

### Control Panel

The control panel houses the drawing tools and viewing options. The first control is a slider that controls the width of
the curve. The default position is the third tick mark. Sliding to the right makes the curve wider and sliding to the
left makes it narrower.

A selection of vertical radio buttons allows the user to pick from a variety of functions. Once the user select a
portion of the graph, the function will update itself with the appropriate function.

An undo and zero buttons appear under the vertical radio buttons. The _Undo_ button, represented by a back arrow, erases
the last change done to the function. The application of the _Zero_ button, represented by an eraser, sets the function
f(x) to zero for all x values.

To illustrate non-differential points in f(x), open circles will appear at the non-differential points for the
derivative.

## _Integral Lab_ Screen

The _Integral Lab_ screen includes two main features not found on the _Intro_ screen. An additional checkbox button to
the left of the graph is added. It allows the user to show the integral graph of f(x).

A _smooth_ button is added to the control panel that smooths the original function f(x) by performing a local average of
the function. The smooth button can be iterated multiple times to further smooth the function.

The choice of functions has been expanded to include triangular, parabolic, pedestal, sinusoidal and free form
functions.

## _Derivative Lab_ Screen

The _Derivative Lab_ screen includes all the features from the _Intro_ screen but adds a second derivative checkbox. The
smooth button and the choice of functions is similar to the _Integral lab_ screen. 
