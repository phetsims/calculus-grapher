# Calculus Grapher - Model Description

@author Martin Veillette
<br>@author Chris Malley (PixelZoom, Inc.)

This document is a high-level description of the model used in PhET's _Calculus-Grapher_ simulation.

The Calculus Grapher simulation is designed to help students visualize and understand concepts in calculus, specifically
relating to graphs of functions, derivatives, and integrals. The main functionalities of the simulation include:

Graphing functions: The simulation allows students to manipulate a function. These include the ability to drag points on
the graph to see how the function changes as well as change the curve mode.

Tangent Tool: Students can graph the derivative of a function and see how the derivative changes as they modify the
original function. With the tangent tool, users can select a point on the curve and visualize the tangent line at that
point. The tool displays the slope of the tangent line and allows users to drag the point along the curve to observe how
the tangent line changes as the point moves.

Area under Curve: The user can use the "Area Under Curve" tool to visualize the area under a curve. The user can drag a
scrubber to specify the upper bound of integration. The simulation then calculates and displays the area under the selected
portion of the curve and the value of the definite integral that represents the area.

Overall, the Calculus Grapher simulation is a powerful tool for students to explore and visualize concepts in calculus,
and to gain a deeper understanding of the graphical relationships between functions and their derivatives and integrals.

The simulation comprises a user-controlled function f(x) and, depending on the screen, the integral and or derivative of
that function. A large double-headed arrow is initially
present at the start of the simulation to indicate to the user that the curve of f(x) is interactive. The function f(x)
can be controlled by a control panel on the right-hand side.

## Common Controls

A control panel, on the right-hand side, houses the drawing tools and viewing options. The first control is a slider
that controls the width of the curve. Sliding to the right makes the curve wider and sliding to the left makes it
narrower.

Radio buttons allow the user to pick from a variety of "curve manipulation mode" functions (See below for more details
on each mode). Once the user selects a portion of the graph, the function will update itself with the appropriate
function.

Undo and Eraser buttons appear under the vertical radio buttons. The _Undo_ button, represented by a back arrow, erases
the last change done to the function. The Eraser button resets the function f(x) to its initial state (which is
typically y=0).

Below the control panel is a "Reference Line" checkbox, indicated by a vertical line. When checked, the Reference Line
will
appear on the graphs. The reference line spans all the graphs and the x-position of the reference line is controlled
by the user.

Zoom buttons are available on the left-hand side of the derivative and integral graphs.
It allows the user to upscale or downscale the y-axis.

Also, below the control panel is a Grid checkbox. When checked, each graph will contain independent internal gridlines.
The
gridlines will scale accordingly to the zoom level.

Settings can be found in the _Simulation_ tab of the _Preference_ dialog. The five settings are:
- Variable: Picks label x or t for the horizontal variable.
- Notation: Picks Lagrange (prime) or Leibniz (df/dx) notation for the derivation.
- Discontinuities: Selects the discontinuities to be connected with a dashed line or unconnected.
- Values: Shows numerical value on graph axes, reference line, slope of tangent, and area under curve.
- Predict: Adds a mode where you can predict the function f(x)

The simulation comprises four screens: Derivative, Integral, Advanced and Lab. Below, we provide a brief description of
each screen.

## _Derivative_ Screen

At the top of the _Derivative_ screen, one finds the function f(x). Underneath the function f(x), a graph of the
derivative is rendered. The visibility of the curve on each graph is controlled via an eye toggle button, on the
left-hand side of each graph.

A finite difference method is used to determine the derivative. To illustrate non-differential points in f(x), open
circles appear at the non-differential points for the derivative.

The "Tangent" checkbox below the control panel triggers the visibility of three components: (1) a user-controlled
scrubber at the bottom of the graphs, (2) a tangent arrow on the original graph, and (3) the "Slope of Tangent"
accordion box with a barometer of the value of the tangent. The user can move the horizontal position of scrubber to
change the x-position of the tangent arrow.

## _Integral_ Screen

At the top of the _Integral_ screen, one finds the definite integral of f(x). Underneath this graph, user controlled
function f(x) is displayed. The definite integral is calculated numerically through a trapezoidal Riemann sum.

The "Area Under Curve" checkbox below the control panel triggers the visibility of three components: (1) a
user-controlled scrubber at the bottom of the graphs, (2) an area plot on the original graph, and (3) the "Net Signed
Area" accordion box with a barometer indicating the value of the area under the curve. The user can move the horizontal
position of scrubber to change the upper bound of the area under the curve.

## _Advanced_ Screen

The _Advanced_ screen includes two main features not found on the previous screens. A set of two rectangular buttons are
added to the left of the graphs. It allows the user to toggle between the derivative and the integral graphs.

A "Smooth" button is added to the control panel that smooths the original function f(x) by performing a local average of
the function. The "Smooth" button can be pressed multiple times to further smooth the function.

The choice of functions has been expanded to include triangular, parabolic, sinusoidal and free-form
functions.

## _Lab_ Screen

The _Lab_ screen includes all the features from the _Advanced_ screen, and adds a third graph on the screen.

## Curve Manipulation Modes

A user can manipulate the original function through a set of curve manipulation modes. There are eight curve
manipulation modes in this simulation. The curve manipulation modes are:

- HILL: A bell-shaped curve represented by a gaussian function. The width of the curve is related to the standard
  deviation.
- PEDESTAL: A continuous boxcar function. The width slider controls the width of its plateau.
- TRIANGLE: A triangular function. The width slider controls the steepness of its slope.
- PARABOLA: A portion of a parabola. The width slider controls the curvature of the parabola.
- SINUSOID: A portion of a sinusoidal function. The width slider controls the wavelength of the sinusoidal function. The
  slider default value matches a wavelength/period of 2π.
- FREEFORM: Indicated by a pencil icon. It allows a user to draw a curve by clicking and dragging the mouse.
- TILT: Indicated by a tilted line icon. It allows a user to tilt the entire curve with the fulcrum point at x=0
- SHIFT: Indicated by a horizontal line icon. It allows a user to shift the entire curve by a constant amount.

## Approximations, Limitations and Implementation Details

We approximate curves by generating a set of discrete points with fixed x-coordinates. There are 1251 points per curve.
Each point in a curve has a specific point type metadata, such as a smooth, cusp, or discontinuity. A function has a
jump discontinuity if the left and right-hand limits of the function are not equal. In such cases, points on both sides
of the jump are labeled as discontinuous.
Similarly, points are labeled cusp points if the curve slope changes suddenly. We leverage the point type to determine
which
points should be linked to yield the appearance of a smooth curve and which points should not be linked but appear as
circles (say to represent discontinuities). Curve manipulations are handled by a set of functions that update the curve
points based on user input. The point type is assessed based on the type of curve mode that is being manipulated.

Mathematically, the integral curve is calculated as a left Riemann sum based on the points in the f(x) curve. The point
type metadata of the integral curve is based on the metadata of a point of the f(x) curve, but where cusp points are
promoted to smooth and discontinuities are promoted to cusps.

We compute the derivative curves, such as the first and second derivatives, using a finite difference method based on
adjacent points. For example, the derivative of a function f(x) is approximated by computing the slope of a secant line
between its adjacent points. Special care is given to points identified as cusp and discontinuities, where the secant
line is calculated with the appropriately selected neighboring point. The point type metadata of the derivative is
inherited from the curve f(x), except that cusp points are promoted to discontinuities for the derivatives.

The second derivative is computed based on the second-order central formula of the function f(x). The point type
metadata of the second derivative is inherited from the curve f(x), except that cusp points are promoted to
discontinuities for the second derivative. The second derivative of discontinuous points is approximated as equal to its
smooth neighboring point.

The undo function is implemented by saving a stack of previous states of the curve. Each time the user performs an
action that modifies the curve, such as smoothing or using a curve manipulation, the current state of the curve is saved
at the end of the action and pushed onto the stack. When the user invokes the undo function, the most recent state is
popped from the stack and used to restore the curve. We save up to 20 recent curve states.  
