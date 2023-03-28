# Calculus Grapher - Implementation Notes

@author Martin Veillette
<br>@author Chris Malley (PixelZoom, Inc.)

This document contains notes related to the implementation of Calculus Grapher. This is not an exhaustive description of
the implementation. The intention is to provide a high-level overview, and to supplement the internal documentation (
source code comments) and external documentation (design documents).

The reader is encouraged to read the model document before proceeding:

* [model.md](https://github.com/phetsims/calculus-grapher/blob/master/doc/model.md), a high-level description of the
  simulation model

## Terminology

* Graph - It consists of a coordinate plane with horizontal and vertical axes, with tick marks with optional grid lines.
  and tick labels. A graph includes one or multiple curves which shows how a function behaves as its input (x) changes.
* Original Graph - It refers to the graph that contains the f(x) function. It is the only graph whose curve(s) can be
  user manipulated. The original graph includes the original curve and, optionally, the predict curve.
* Curve - A curve is a complete parametrization of the shape of a mathematical function on a graph. All model curves are
  composed of closely-spaced curve points. In calculus-grapher, a model curve is a complete representation of a
  mathematical function.
* Original curve - It refers to the curve on the original graph that represents the f(x) function. It can be manipulated
  by the user.
* Predict Curve - It is a curve that is generated based on a user's input. It allows the user to attempt to predict the
  function f(x). It is set to be invisible by default.
* Plot - In Calculus-Grapher, a plot is defined as a representation of a portion of a curve. The curve of a graph may be
  composed of several plots to represent separate elements of the curve, such as the discontinuous points, discontinuity
  lines, continuous portion of the curve, etc. This is based on the PhET library bamboo.
* Scrubber - a tool with a sphere-shaped handle, which can be dragged to place the tool at an arbitrary x location
* Reference Line scrubber - the scrubber with a blue handle, which lets you place a vertical "reference line" at an
  arbitrary x location.
* Labeled Line - a feature that is available only via PhET-iO, which allows you to place a vertical line at an arbitrary
  x location, and label that line
* Labeled Point - a feature that is available only via PhET-iO, which allows you to place a point on the f(x) curve at
  an arbitrary x location. and label that point.

## General Considerations

This section describes how this sim addresses implementation considerations that are typically encountered in PhET sims.

### Query Parameters

Query parameters are used to enable sim-specific features. Sim-specific query parameters are documented
in [CalculusGrapherQueryParameters.ts](https://github.com/phetsims/calculus-grapher/blob/master/js/common/CalculusGrapherQueryParameters.ts).
Running with `?log` will print the complete set of query parameters (common-code, PhET-iO, and sim-specific)
to the browser console.

### Model-View Transforms

Every graph in the simulation has a model-view transform, implemented using bamboo's ChartTransform.js. The model has +x to the left, and +y up, while the view has +x to the left, and +y _down_. The scaling changes based on the zoom level.

### Memory Management

* **Dynamic allocation**: Most objects in this sim are allocated at startup, and exist for the lifetime of the
  simulation. The exceptions to that are:
  * Vector2 instances created by bamboo when rendering data sets (see calls to `setDataSet`)
  * LabelNodes in `GraphTypeLabelNode`, which are created dynamically based on the type of graph and customized based on
    choices of variables and notations.
  * UI subcomponents of the "Simulation" tab in the Preferences dialog. These components are found in
    calculus-grapher/common/view/preferences/

* **Listeners**: Unless explicitly noted in the code, all uses of `link`, `addListener`, etc. do _not_ need a corresponding
  `unlink`, `removeListener`, etc.  Classes remove listeners by implementing or overriding `dispose`.  Factory functions remove listeners via `disposeEmitter.addListener`.

## Common Framework for All Screens

The four-screen simulation is based almost solely on the code in calculus-grapher/common/model/. Individual screens are
typically customized by passing appropriate options fields to the common implementation. As a result, it is important
for future maintainers to familiarize themselves with the common model of the simulation. Below, we provide an overview
of the most important classes and their relationships.

### Model Class Hierarchy

CalculusGrapherModel - the top-level model class

GraphType - Types for identifying the types of graphs available, and sets of those graphs.
GraphSet - GraphSet is an ordered set of GraphType

CurveManipulationMode - Enumeration of the possible 'modes' of manipulating OriginalCurve, such as Parabola, Triangle, etc.
CurveManipulationProperties - Track the Curve Width and the Curve Mode
CurvePoint - A point tracking the x, y and pointType of a curve. CurvePoint are never disposed but merely mutated.
Curve - A collection of CurvePoints. Intended to be sub-classed
- TransformedCurve - A Curve that can be manipulated by user transformation. Extends Curve.
- IntegralCurve - The integral of a Curve. Extends Curve.
- DerivativeCurve - The first derivative of a Curve. Extends Curve.
- SecondDerivativeCurve - The second derivative of a Curve. Extends Curve.

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
functionality that is common to all types of curves, which are 'integral', 'original', 'derivative' and 'secondDerivative' curves, and is intended to be sub-classed for type-specific features.

Curves are modeled by segmenting the curve into a large number of evenly spaced CurvePoints and map out
the y-values of the shape and curvature of the `Curve`. Adjacent CurvePoints are considered to be close
enough for derivative and integral computations and are considered to cover 'every' x-value within its domain.
An AXON/emitter on the Curve can emit to signal that its CurvePoints have changed in any form.

`CurvePoint` keeps track of the x and y values of a point, as well as the point type. The point type is an enumeration
that consists of the types: 'smooth', 'cusp', and 'discontinuous'. CurvePoint can save the previous state of a point
into a stack that can be restored for undo operations.

`TransformedCurve` is a subtype for the main curve that the user interacts with and manipulates.
For originalCurve, the CurvePoints are updated when a user manipulates the CurvePoints through a method
on `TransformedCurve`.

`TransformedCurve` is mainly responsible for:

- Implementing the response algorithms that are used when the user drags on the TransformedCurve. The response is
  affected by the CurveManipulationMode and the 'width' of the curve-manipulation.
- Implementing smoothing and undoing the curve
- Saving the curve
- Resetting all the points of the curve

`DerivativeCurve` and `SecondDerivativeCurve` are `Curve` subtypes whose main responsibilities are to observe when the
originalCurve changes by listening to the AXON/emitter on the originalCurve and
differentiates it and update the `CurvePoint`s of the first and second derivative. The derivatives are computed by
considering the slope of the secant lines from both sides of every point.

`IntegralCurve` is a `Curve` subtype for the curve that represents the integral of the `TransformedCurve`. The
TransformedCurve is referenced as the originalCurve of the IntegralCurve. IntegralCurve's main responsibility is to
observe when the originalCurve changes and integrate it and update the
`CurvePoint`s of the Integral. The implementation of the integral uses a trapezoidal Riemann sum to approximate
integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule for background.

### Ancillary Tools

AncillaryTool is the model base class associated with an x value on the graph. It keeps track of the following quantities associated with the x value:

- the integral of f(x)
- the original function f(x)
- the derivative of f(x)
- the second derivative of f(x)

- All of the above quantities are derived from their associated curve. For performance reason, the quantities above are
  updated solely when its associated tool is visible.
  Many tools such as the Area Under Curve tool, Tangent tool, Reference Line tool, as well as the PhET-IO tools, Labeled
  Points and Labeled Lines, extend the AncillaryTool class.

## PhET-iO

For the most part, the PhET-iO instrumentation follows a standard pattern. There are two specific types of PhET-iO
elements to this simulation:

- `GraphSetIO`: Handles the PhET-iO instrumentation for the GraphSet, which is the set of GraphTypes that are available
  in the simulation.
- `CurvePointIO`: Handles the serialization of the `CurvePoint`. The stack feature, which preserves the previous states
  of CurvePoint for the undo button, has been purposefully not serialized. 
