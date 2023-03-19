# Calculus Grapher - Model Description

@author Martin Veillette

This document is a high-level description of the model used in PhET's _Calculus-Grapher_ simulation.

The Calculus Grapher simulation is designed to help students visualize and understand concepts in calculus, specifically relating to graphs of functions, derivatives and integrals. Some of the main functionalities of the simulation include:

Graphing functions: The simulation allows students to manipulate a function. These include the ability to drag points on the graph to see how the function changes as well as change the curve mode.

Tangent Tool: Students can graph the derivative of a function, and see how the derivative changes as they modify the original function. With the tangent tool, users can select a point on the curve and visualize the tangent line at that point. The tool displays the slope of the tangent line and allows users to drag the point along the curve to observe how the tangent line changes as the point moves.

Area under Curve: The user can use the "Area Under Curve" tool to visualize the area under a curve. The user can drag a scrubber to specify the limits of integration. The simulation then calculates and displays the area under the selected portion of the curve, as well as the value of the definite integral that represents the area.

Overall, the Calculus Grapher simulation is a powerful tool for students to explore and visualize concepts in calculus, and to gain a deeper understanding of the relationships between functions and their derivatives and integrals.

###

The simulation comprises a user-controlled function f(x) and, depending on the screen, the integral and or derivative of
that function. To indicate to the user that the curve of f(x) is interactive, a large double-headed arrow is initially
present at the start of the simulation. The function f(x) can be controlled by a control panel on the right-hand side

## Common Controls

A control panel, on the right hand side, houses the drawing tools and viewing options. The first control is a slider
that controls the width of the curve. The default position is the third tick mark. Sliding to the right makes the curve
wider and sliding to the left makes it narrower.

A selection of vertical radio buttons allows the user to pick from a variety of functions. Once the user select a
portion of the graph, the function will update itself with the appropriate function.

An undo and zero buttons appear under the vertical radio buttons. The _Undo_ button, represented by a back arrow, erases
the last change done to the function. The application of the _Zero_ button, represented by an eraser, sets the function
f(x) to zero for all x values.

The simulation includes a reference line checkbox, indicated by a vertical line. When checked, the reference line will
appear in the play space. The reference line spans all the graph and the x-position of the reference line is controlled
by the user.

Zoom control buttons are available on the left hand side of the derivative and integral graphs.
It allows the user to upscale or downscale the y-axis.

The simulation includes a grid Checkbox. When checked, each graph will contain independent internal gridlines. The
gridlines will scale accordingly to the zoom level.

Settings can be found in the _Simulation_ tab of the _Preference_ dialog. The five settings are:
- Variable: Picks label x or t for the horizontal variable.
- Notation: Picks Lagrange (prime) or Leibniz (df/dx) notation for the derivation.
- Discontinuities: Selects the discontinuities to be connected with a dashed line or unconnected.
- Values: Shows numerical value on graph axes, reference line, slope of tangent, and area under curve.
- Predict: Adds a mode where you can predict the function f(x)

The simulation comprise four screens: Derivative, Integral, Advanced and Lab. We provide below a brief description of
each screen.

## _Derivative_ Screen

At the top of the _Derivative_ screen, one finds the function f(x). Underneath the function f(x), a graph of the
derivative is rendered. The visibility of the curve on each graph is controlled via an eye toggle button, on the left
hand side of each graph.

A finite difference method is used to determine the derivative. To illustrate non-differential points in f(x), open
circles appear at the non-differential points for the derivative.

The tangent checkbox below the control panel triggers the visibility three components: (1) a user-controlled scrubber at the bottom of the graphs, (2) a tangent arrow on the original graph, and (3) an accordion box with  barometer of the value of the tangent. The user can move the horizontal position of scrubber to change the x-position of the tangent arrow.


## _Integral_ Screen

At the top of the _Integral_ screen, one finds the definite integral of f(x). Underneath this graph, user controlled
function f(x) is displayed. The definite integral is calculated numerically through a trapezoidal Riemann sum.

The area under curve checkbox below the control panel triggers the visibility three components: (1) a user-controlled scrubber at the bottom of the graphs, (2) an area chart arrow on the original graph, and (3) an accordion box with  barometer of the value of the area under the curve. The user can move the horizontal position of scrubber to change the x-position of the tangent arrow.


## _Advanced_ Screen

The _Advanced_ screen includes two main features not found on the previous screens. A set of two rectangular buttons are
added to the left of the graphs. It allows the user to toggle between the derivative and the integral graphs.

A _smooth_ button is added to the control panel that smooths the original function f(x) by performing a local average of
the function. The smooth button can be iterated multiple times to further smooth the function.

The choice of functions has been expanded to include triangular, parabolic, sinusoidal and free form
functions.

## _Lab_ Screen

The _Lab_ screen includes all the features from the _Advanced_ screen but adds a third graph on the screen.
