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

- `numberOfPoints` sets the number of curves points. The default value is 1251.
- `smoothingStandardDeviation` sets the width used in the smoothing function.
- `maxTilt` sets the maximum tilting angle (in tilt mode) of curves relative to the horizontal. The default value is 45.
- `edgeSlopeFactor` sets the width of the rounded corner in pedestal mode (continuous trapezoidal-shaped curve with
  rounded corners). A larger value creates a wider edge.
- `allPoints` shows all the curve points as circles in a scatter plot. The default value is false.
- `cuspPoints` shows all the cusp points as circles in a scatter plot. The default value is false.
- `labeledLinesVisible` is used to make all LabeledLine instances initially visible. The default value is false.
- `labeledPointsVisible` is used to make all LabeledPoint instances initially visible. The default value is false.

There are a number of query parameters that are made public.
- `valuesVisible` shows numerical values wherever they appear in the sim: tick labels, tangent-line slope, etc.. The default value is false.
- `connectDiscontinuities` connects curve discontinuities with a dashed line (true) or leave a gap (false). The default value is true.
- `derivativeNotation` is derivative notation to be used throughout the simulation. Valid values are 'lagrange' and 'leibniz'. The default value is 'lagrange'.
- `functionVariable` represents the variable that would be used for the horizontal axis of the graph. Valid values are 'x' and 't'. The default value is 'x'.
- `predict` shows features related to the predict curve are shown in the UI when set to true. The default value is false.
- `hasShowOriginalCurveCheckbox` whether the 'Show f(x)' checkbox will be shown when in 'predict' mode.
The default value is true. Note the visibility of the checkbox is contingent on the status of 'predict' being true.

### Hierarchy from Common Model

The four-screen simulation is based almost solely from the common model trunk. Individual screens are typically customized by passing appropriate options fields to the common trunk. As a result, it is important for future maintainers to familiarize themselves with the common model of the simulation. Below we provide an overview of  all the common class model and their relationships.

CalculusGrapherModel - The main entry point of the model

GraphType - Types for identifying the types of graphs available, and sets of those graphs.
GraphSet - GraphSet is an ordered set of GraphType

CurveManipulationMode - Enumeration of the possible 'modes' of manipulating OriginalCurve, such as Parabola, Triangle, etc.
CurveManipulationProperties - Track the Curve Width and the Curve Mode
CurvePoint - A point tracking the x, y and pointType of a curve. CurvePoint are never disposed but merely mutated.
Curve - A collection of CurvePoints. Intended to be sub-classed
- TransformedCurve - A Curve that can be manipulated by user transformation. Extends Curve.
- IntegralCurve - The integral of a Curve. Extends Curve.
- DerivativeCurve - The derivative of a Curve. Extends Curve.

AncillaryTool - A model base class associated with an x value on the graph. Intended to be sub-classed
- AreaUnderCurveScrubber - Model for the scrubber 'AreaUnderCurve'.  Extends AncillaryTool.
- TangentScrubber - Model for the scrubber 'Tangent'- Extends AncillaryTool.
- ReferenceLine - Model for a vertical Line. Extends AncillaryTool
- LabeledAncillaryTool - A model base class for a labelled ancillary tool. Extends AncillaryTool
   -LabeledLine - A model for a labeled vertical line. Extends LabeledAncillaryTool
   -LabeledPoint - A model for a labeled point.  Extends LabeledAncillaryTool

CalculusGrapherPreferences - Sim-specific preferences, accessed via the Preferences dialog.

### Curve Hierarchy

`Curve` is the base-class for a single 'curve' that appears in the 'Calculus Grapher' simulation. It provides
functionality that is common to all types of curves, which are 'integral', 'original', and 'derivative' curves, and is intended to be sub-classed for type-specific features.

Curves are modeled by segmenting the curve into a large number of evenly spaced CurvePoints and map out
the y-values of the shape and curvature of the `Curve`. Adjacent CurvePoints are considered to be close
enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.

`TransformedCurve` is a subtype for the main curve that the user interacts with and manipulates, which then triggers a change in the CurvePoints and the Curve's integral, derivative, and second-derivative Curves.

`TransformedCurve` is mainly responsible for:
- Implementing the response algorithms that are used when the user drags on the TransformedCurve. The response is
    affected by the CurveManipulationMode and the 'width' of the curve-manipulation.
- Implementing smoothing, and undoing
- Saving the curve
- Resetting all the points of the curve

DerivativeCurve's main responsibility is to observe when the 'base' Curve changes and differentiates it and update
the Points of the derivative. Derivatives are computed by considering the slope of the secant lines from both sides
of every point.

`IntegralCurve` is a Curve subtype for the curve that represents the integral of the TransformedCurve. The TransformedCurve
is referenced as the 'base' Curve of the IntegralCurve.

IntegralCurve's main responsibility is to observe when the 'base' Curve changes and integrate it and update the
Points of the Integral. Our implementation of the integral uses a trapezoidal Riemann sum to approximate integrals.
See https://en.wikipedia.org/wiki/Trapezoidal_rule
for background. Since the 'base' Curve exists at all Points, the Integral is also finite at all points.
