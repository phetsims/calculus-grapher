# Calculus-Grapher - Implementation Notes

@author Martin Veillette

## General Considerations

The reader is encouraged to read the model document before proceeding:

* [model.md](https://github.com/phetsims/calculus-grapher/blob/master/doc/model.md), a high-level description of the
  simulation model

### Model-View Transforms

A model-view transform is used for each graph. The model has +x to the left, and +y up. The scaling changes based on the zoom level.

### Query Parameters

There are a number of query parameters for internal use.

- `pointsPerCoordinate` sets the number of curves points per coordinates. The default value is 10.
- `smoothingStandardDeviation` sets the width used in the smoothing function. The default value is 0.25 .
- `maxTilt` sets the maximum tilting angle (in tilt mode) of curves relative to the horizontal. The default value is 45.
- `edgeSlopeFactor` sets the width of the rounded corner in pedestal mode (continuous trapezoidal-shaped curve with
  rounded corners). A larger value creates a wider edge. The default value is 1.5
- `derivativeThreshold` sets the maximum difference between the slope of the left and right secant lines of a Point on a
  curve for it to be considered differentiable. The default value is 12.
- `allPoints` shows all the curve points as circles in a scatter plot. The default value is false.
- `cusps` shows all the cusps points as circles in a scatter plot. The default value is false.
- `valuesVisible` shows numerical values wherever they appear in the sim: tick labels, tangent-line slope, etc.. The default value is false.
- `connectDiscontinuities` connects curve discontinuities with a dashed line (true) or leave a gap (false). The default value is true.

### Curve Hierarchy

`Curve` is the base-class for a single 'curve' that appears in the 'Calculus Grapher' simulation. It provides
functionality that is common to all types of curves, which are 'integrals', 'original', and 'derivative' curves, and is
intended to be sub-classed for type-specific features.

Curves are modeled by segmenting the curve into a finite number of CurvePoints that are close together and map out
the y-values of the shape and curvature of the `Curve`. Adjacent CurvePoints are considered to be close
enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.

`OriginalCurve` is a `TransformedCurve` subtype for the main curve that the user interacts with and manipulates, which then triggers a change in the CurvePoints and the OriginalCurve's integral, derivative, and second-derivative Curves.

`OriginalCurve` is mainly responsible for:

- Keeping track of the current CurveManipulationMode. When the user drags on the OriginalCurve, the curve is
  manipulated based on the current CurveManipulationMode, allowing the user to create custom curves.

- Keeping track of the 'width' of the curve-manipulation. This only applies to HILL, TRIANGLE, PEDESTAL, PARABOLA,
  and SINE, and the value is interpreted differently for each response algorithm to curve user-manipulation.

- The response algorithms that are used when the user drags are found in TransformedCurve. The response is
  affected by the CurveManipulationMode and the 'width' of the curve-manipulation.

- Implementing smoothing, undoing, and other interactions

`TransformedCurve` is a `Curve` subtype for the main curve that the user interacts with and manipulates.
`TransformedCurve` is mainly responsible for:
  - Implementing the response algorithms that are used when the user drags on the TransformedCurve. The response is
    affected by the CurveManipulationMode and the 'width' of the curve-manipulation. The algorithms for curve
    manipulation response were adapted and improved from the flash implementation of Calculus Grapher.
  - Saving the curve
  - Resetting all the points of the curve

DerivativeCurve's main responsibility is to observe when the 'base' Curve changes and differentiates it and update
the Points of the derivative. Derivatives are computed by considering the slope of the secant lines from both sides
of every point.

`IntegralCurve` is a Curve subtype for the curve that represents the integral of the OriginalCurve. The OriginalCurve
is referenced as the 'base' Curve of the IntegralCurve.

IntegralCurve's main responsibility is to observe when the 'base' Curve changes and integrate it and update the
Points of the Integral. Our implementation of the integral uses a trapezoidal Riemann sum to approximate integrals.
See https://en.wikipedia.org/wiki/Trapezoidal_rule
for background. Since the 'base' Curve exists at all Points, the Integral is also finite at all points.
