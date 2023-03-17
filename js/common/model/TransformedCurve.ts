// Copyright 2020-2023, University of Colorado Boulder

/**
 * TransformedCurve is a Curve subclass for a curve that the user interacts with and manipulates, which then
 * triggers a change in the CurvePoints. It is used for f(x) (the 'original' curve) and the 'Predict' curve.
 *
 * TransformedCurve is mainly responsible for:
 *
 *   - Resetting all the points of the curve
 *   - Saving the state of the curve
 *   - Undoing the curve to its previous state
 *   - Smoothing the curve
 *   - Implementing the response algorithms that are used when the user drags on the TransformedCurve. The response is
 *     affected by the CurveManipulationMode and the 'width' of the curve-manipulation. The algorithms for curve
 *     manipulation response were adapted and improved from the flash implementation of Calculus Grapher. The methods
 *     associated with the various CurveManipulationModes are
 *     - HILL -> createHillAt
 *     - PEDESTAL -> createPedestalAt
 *     - TRIANGLE -> createTriangleAt
 *     - PARABOLA -> createParabolaAt
 *     - SINUSOID -> createSinusoidAt
 *     - FREEFORM -> drawFreeformToPosition
 *     - SHIFT -> shiftToPosition
 *     - TILT -> tiltToPosition
 *
 * We should note that the TransformedCurve class is the basis of the original curve, and, therefore,
 * its first, and second derivative will be evaluated. As a result, much effort was spent creating curve manipulations
 * that yields unusually smooth curves for which their first and second derivatives are themselves smooth.
 *
 * Most curve manipulations make use of a weight function to "blend" in a curve segment into a previous curve.
 * A weight function is a mathematical device used when performing an average to give
 * some elements more "weight" or influence on the result than other elements in the same set.
 * The result of the application of a weight function is a weighted sum or weighted average.
 * A variety of weight functions ranging from gaussian kernel, super gaussian, mollifying functions
 * are used to create curves without cusps and discontinuities.
 *
 * TransformedCurve is created at the start and persists for the lifetime of the simulation.
 *
 * @author Martin Veillette
 */
import Vector2 from '../../../../dot/js/Vector2.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import Curve, { CurveOptions } from './Curve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import CurvePoint from './CurvePoint.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import CompletePiecewiseLinearFunction from '../../../../dot/js/CompletePiecewiseLinearFunction.js'; // constants

// constants
const EDGE_SLOPE_FACTOR = CalculusGrapherQueryParameters.edgeSlopeFactor;
const STANDARD_DEVIATION = CalculusGrapherQueryParameters.smoothingStandardDeviation;
const MAX_TILT = CalculusGrapherQueryParameters.maxTilt;
const TYPICAL_Y = CalculusGrapherConstants.TYPICAL_Y;
const WEE_WIDTH = CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 40;
const UPPER_WEIGHT = 0.999; // a very large cutoff for weights
const LOWER_WEIGHT = 1e-8; // a very small number that cutoff small weight contributions.

assert && assert( UPPER_WEIGHT < 1 && UPPER_WEIGHT >= 0, `UPPER_WEIGHT must range from 0 to 1, inclusive: ${UPPER_WEIGHT}` );
assert && assert( LOWER_WEIGHT < 1 && LOWER_WEIGHT >= 0, `LOWER_WEIGHT must range from 0 to 1, inclusive: ${LOWER_WEIGHT}` );
assert && assert( LOWER_WEIGHT < UPPER_WEIGHT, 'LOWER_WEIGHT must be < UPPER_WEIGHT' );

type MathFunction = ( x: number ) => number;

type SelfOptions = EmptySelfOptions;

export type TransformedCurveOptions = SelfOptions & CurveOptions;

export default class TransformedCurve extends Curve {

  // Has the curve been manipulated since instantiation or the last reset call? Used by the view to show cueing arrows.
  public readonly wasManipulatedProperty: Property<boolean>;

  public constructor( providedOptions: TransformedCurveOptions ) {

    const options = optionize<TransformedCurveOptions, SelfOptions, CurveOptions>()( {

      // CurveOptions
      pointsPropertyReadOnly: false
    }, providedOptions );

    super( options );

    this.wasManipulatedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'wasManipulatedProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Has the curve been manipulated by the student?'
    } );
  }

  public reset(): void {

    this.wasManipulatedProperty.reset();

    // Reset every CurvePoint to its initial state.
    this.points.forEach( point => point.reset() );
    this.curveChangedEmitter.emit();
  }

  /**
   * Saves the current state (y-value and pointType) of the Points for the next undo() call.
   *
   * This method is invoked when the user starts manipulating the TransformedCurve. When the undo button is pressed,
   * the CurvePoints of the TransformedCurve will be set to their last saved state.
   */
  public saveCurrentPoints(): void {

    // Save the current state of each CurvePoint.
    this.points.forEach( point => point.save() );
  }

  /**
   * Sets the state of this CurvedPoint on this Curve to its last saved state.
   * This method is invoked when the undo button is pressed, which successively undoes the last action.
   */
  public undo(): void {

    // Revert to the saved pointState of each CurvePoint.
    this.points.forEach( point => point.undo() );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Smooths the curve. It is called when the user presses the 'smooth' button.
   * This method uses a weighted-average algorithm for 'smoothing' a curve, using a gaussian kernel
   * see https://en.wikipedia.org/wiki/Kernel_smoother
   */
  public smooth(): void {

    // Saves the current values of our Points for the next undo() call.
    // Note that the current y-values are the same as the previous y-values
    // for all Points in the TransformedCurve.
    this.saveCurrentPoints();

    // Normalized gaussian kernel that will be used in the convolution of our curve
    const normalizationFactor = 1 / ( STANDARD_DEVIATION * Math.sqrt( 2 * Math.PI ) );

    // Weighted kernel: Note that gaussianFunction(x) = gaussianFunction(-x), which we will use later on.
    const gaussianFunction = ( x: number ) => normalizationFactor * Math.exp( -1 / 2 * ( x / STANDARD_DEVIATION ) ** 2 );

    // Loops through each Point of the curve and set the new y-value.
    this.points.forEach( point => {

      // Main idea: For each point we want to average its y-value with points in the local "neighborhood".
      // We will do so by summing points on the left and the right of this point with appropriate weights.

      // Flags that tracks the sum over all points of the weighted y-values.
      let totalWeight = 0;
      let weightedY = 0;

      // We start the sum with the point we want to average.
      totalWeight += gaussianFunction( 0 );
      weightedY += this.getClosestPointAt( point.x ).lastSavedY * gaussianFunction( 0 );

      // We will sum the other points, ideally all of them, in practice, we use the kernel over a number of standard deviations.
      // Beyond 3 standard deviations, the kernel has a very small weight, less than 1%, so that points beyond
      // three standard deviations do not make meaningful contributions to the average.
      const numberOfStandardDeviations = 3;

      // Loops through each point on BOTH sides of the window, adding the y-value to our total in order
      // to do a symmetric sum: https://github.com/phetsims/calculus-grapher/issues/293.
      for ( let dx = this.deltaX; dx <= numberOfStandardDeviations * STANDARD_DEVIATION;
            dx += this.deltaX ) {

        // Weight of a point at a distance dx from our point of interest
        const weight = gaussianFunction( dx );

        // Add the weights (times two because we have points on the left and the right)
        totalWeight += 2 * weight;

        // Add the points lastSavedY, which was the Point's y-value before the smooth() method was called.
        weightedY += this.getClosestPointAt( point.x + dx ).lastSavedY * weight +
                     this.getClosestPointAt( point.x - dx ).lastSavedY * weight;
      }

      // Set the point's new y-value to be the weighted average of all the other points.
      point.y = weightedY / totalWeight;

      // Since this is a smoothing operation, we are explicitly setting the point type to smooth (for all points), regardless
      // of their previous point type.
      point.pointType = 'smooth';
    } );

    // Signals that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Modifies the points based on the curveManipulationMode and selected width.
   * Responsible for signalling that this Curve has changed.
   *
   * @param mode
   * @param width
   * @param position - position of cursor in model coordinates
   * @param penultimatePosition - last position of cursor in model coordinates
   * @param antepenultimatePosition - before last position in model coordinates
   */
  public manipulateCurve( mode: CurveManipulationMode,
                          width: number,
                          position: Vector2,
                          penultimatePosition: Vector2 | null,
                          antepenultimatePosition: Vector2 | null ): void {

    this.wasManipulatedProperty.value = true;

    if ( mode === CurveManipulationMode.HILL ||
         mode === CurveManipulationMode.PARABOLA ||
         mode === CurveManipulationMode.PEDESTAL ||
         mode === CurveManipulationMode.TRIANGLE ||
         mode === CurveManipulationMode.SINUSOID
    ) {
      this.widthManipulatedCurve( mode, width, position.x, position.y );
    }
    else if ( mode === CurveManipulationMode.TILT ||
              mode === CurveManipulationMode.SHIFT ) {
      this.positionManipulatedCurve( mode, position.x, position.y );
    }
    else if ( mode === CurveManipulationMode.FREEFORM ) {
      this.drawFreeformToPosition( position, penultimatePosition, antepenultimatePosition );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Sets the points for all modes that can be manipulated solely through a position argument.
   */
  public positionManipulatedCurve( mode: CurveManipulationMode, x: number, y: number ): void {

    assert && assert( !mode.hasAdjustableWidth, `mode cannot have adjustable width: ${mode}` );

    if ( mode === CurveManipulationMode.TILT ) {
      this.tiltToPosition( x, y );
    }
    else if ( mode === CurveManipulationMode.SHIFT ) {
      this.shiftToPosition( x, y );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }
  }

  /**
   * Sets the points for all the modes that can be manipulated through their width.
   */
  public widthManipulatedCurve( mode: CurveManipulationMode, width: number, x: number, y: number ): void {

    assert && assert( mode.hasAdjustableWidth, `mode must have adjustable width: ${mode}` );

    if ( mode === CurveManipulationMode.HILL ) {
      this.createHillAt( width, x, y );
    }
    else if ( mode === CurveManipulationMode.PARABOLA ) {
      this.createParabolaAt( width, x, y );
    }
    else if ( mode === CurveManipulationMode.PEDESTAL ) {
      this.createPedestalAt( width, x, y );
    }
    else if ( mode === CurveManipulationMode.TRIANGLE ) {
      this.createTriangleAt( width, x, y );
    }
    else if ( mode === CurveManipulationMode.SINUSOID ) {
      this.createSinusoidAt( width, x, y );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }
  }

  /**
   * Sets the y-values of the curve to a shape that can be used to represent a freeform icon curve.
   * We arbitrarily made the free form icon out of four segments.
   *
   * @param yMin - the minimum y-value for the curve
   * @param yMax - the maximum y-value for the curve
   */
  public freeformIconCurve( yMin: number, yMax: number ): void {

    // Convenience variables
    const xLength = this.xRange.getLength();
    const xMin = this.xRange.getMin();
    const width = xLength / 4;

    this.createHillAt( width, xMin + xLength / 5, yMin );
    this.saveCurrentPoints();
    this.createTriangleAt( width, xMin + 2 * xLength / 5, 0.65 * yMax );
    this.saveCurrentPoints();
    this.createParabolaAt( width, xMin + 3 * xLength / 5, yMin );
    this.saveCurrentPoints();
    this.createPedestalAt( width, xMin + 4 * xLength / 5, yMax );
  }

  /**
   * Shifts the curve to the specified drag position, in model coordinates.
   */
  public shiftToPosition( x: number, y: number ): void {

    // Amount to shift the entire curve.
    const deltaY = y - this.getClosestPointAt( x ).y;

    // Shift each of the CurvePoints by deltaY.
    this.points.forEach( point => { point.y += deltaY; } );
  }

  /**
   * Tilts the curve to the specified drag position, in model coordinates.
   * @param x - x-coordinate of the drag position
   * @param y - y-coordinate of the drag position
   */
  private tiltToPosition( x: number, y: number ): void {

    // Fulcrum point: chosen to be the leftmost point.
    const pivotPoint = this.points[ 0 ];

    const leverArm = x - pivotPoint.x;

    // Exclude drags with zero leverArm
    if ( leverArm !== 0 ) {

      // Slope between drag position and pivotPoint
      const targetSlope = ( y - pivotPoint.y ) / leverArm;

      // Update points only if the targetSlope is less than MAX_TILT
      if ( Math.abs( targetSlope ) < MAX_TILT ) {

        const oldSlope = ( this.getClosestPointAt( x ).lastSavedY - pivotPoint.y ) / leverArm;

        const incrementSlope = targetSlope - oldSlope;

        // Shift each of the CurvePoints by a factor associated with the incrementSlope.
        this.points.forEach( point => { point.y = point.lastSavedY + incrementSlope * ( point.x - pivotPoint.x );} );
      }
    }
  }

  /**
   * Creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   */
  private createPedestalAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    // Super gaussian function for centered at x-value `mu`, with min amplitude of 0 and max of 1;
    // We use the square of a gaussian in order to have a very symmetric derivative at the edges of the pedestal
    const gaussianWeight = ( x: number, mu: number ) =>
      Math.exp( -1 * ( ( x - mu ) / EDGE_SLOPE_FACTOR ) ** 4 );

    // Width at the top of the pedestal: The width as defined above represents the width at the base, the plateau width
    // must therefore take into account the width of the edges.
    const plateauWidth = width - 2 * EDGE_SLOPE_FACTOR;

    assert && assert( plateauWidth > 0, 'plateau width must be positive' );

    this.points.forEach( point => {

      // Weight for point transformation
      let P;

      // Condition for the plateau
      if ( Math.abs( point.x - closestPoint.x ) < plateauWidth / 2 ) {
        P = 1;
      }

      // Condition for the left of the plateau
      else if ( point.x <= closestPoint.x ) {

        // Gaussian weight transitions smoothly from 0 to 1 as x increases
        P = gaussianWeight( point.x, closestPoint.x - plateauWidth / 2 );
      }
      else {

        // Point must be to the right of closestPoint
        // Gaussian weight transitions smoothly from 1 to 0 as x increases
        P = gaussianWeight( point.x, closestPoint.x + plateauWidth / 2 );
      }

      this.updatePointValue( point, P, peakY );
      this.updatePointType( point, P );

    } );
  }

  /**
   * Creates a smooth, continuous, and differentiable bell-shaped curve, to the passed-in peak.
   */
  private createHillAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    this.points.forEach( point => {

      // Determine the weight associated with the peak
      const P = Math.exp( -Math.pow( ( point.x - closestPoint.x ) / ( width / ( 2 * Math.sqrt( 2 ) ) ), 2 ) );

      this.updatePointValue( point, P, peakY );
      this.updatePointType( point, P );
    } );
  }

  /**
   * Creates a triangle-shaped peak that is non-differentiable where it intersects with the rest of the Curve.
   */
  private createTriangleAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peakY - closestPoint.lastSavedY;

    // Set the slope coefficient such that the base of the triangle at y=0 has a 'width' equal
    // to this.curveManipulationWidth when the peak is at typicalY value
    const slope = TYPICAL_Y / ( width / 2 );

    const peakFunction = ( deltaY: number, x: number ): number => {
      return peakY - Math.sign( deltaY ) * slope * Math.abs( x - closestPoint.x );
    };

    // Update the y values and point types of the points
    this.iterateFunctionOverPoints( peakFunction, deltaY );

    // IterateFunctionOverPoints assumes the peakFunction is smooth, but we have a cusp at the peak of the triangle
    closestPoint.pointType = 'cusp';
    this.getClosestPointAt( peakX + this.deltaX ).pointType = 'cusp';
  }

  /**
   * Creates a quadratic that is non-differentiable where it intersects with the rest of the Curve.
   */
  private createParabolaAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peakY - closestPoint.lastSavedY;

    // Will set the parabola coefficient such that the parabola at y=0 has a 'width' equal
    // to this.curveManipulationWidth when the peak is at a typicalY value
    const A = TYPICAL_Y * Math.pow( 2 / width, 2 );

    const peakFunction = ( deltaY: number, x: number ): number => {

      return peakY - Math.sign( deltaY ) * A * Math.pow( x - closestPoint.x, 2 );
    };

    // Update the y values and point types of the points
    this.iterateFunctionOverPoints( peakFunction, deltaY );
  }

  /**
   * Creates a sinusoidal wave with a varying amplitude based on the drag-position.
   */
  private createSinusoidAt( width: number, x: number, y: number ): void {

    const closestPoint = this.getClosestPointAt( x );

    // Wavelength associated with the sinusoidal function
    const wavelength = width;

    // Cosine function to apply to points. Cosine function passes through `position`
    const cosineFunction = ( x: number ) =>
      y * Math.cos( Math.PI * 2 * ( ( closestPoint.x - x ) ) / wavelength );

    // Weight function that goes from 1 to 0 from highX to lowX
    // Note that the fact that it is a cosine function is happenstance
    const weightFunction = ( point: CurvePoint, highX: number, lowX: number ) =>
      Math.cos( Math.PI / 2 * ( point.x - highX ) / Math.abs( lowX - highX ) ) ** 2;

    // Base width where we apply the sinusoidal function - ideally it should be an odd multiple of half-wavelengths
    const cosineBase = 7 * ( wavelength / 2 );

    // Width of the transition region to the left and right - ideally should be less than a quarter wavelength
    const edgeWidth = wavelength / 8;

    //             |<---------------cosineBase-------------------->|
    //   ----------|--------------|-----------------|--------------|----------
    //          leftMin        leftMax         rightMin        rightMax
    //   ----------|--------------|-----------------|--------------|----------
    //             |<-edgeWidth-->|                 |<-edgeWidth-->|

    // Bounds to the transition regions to the right and the left for the sinusoidal function

    const cosineBaseMax = closestPoint.x + cosineBase / 2;
    const cosineBaseMin = closestPoint.x - cosineBase / 2;

    const rightMax = ( cosineBaseMax > this.xRange.max ) ? cosineBaseMax : this.getClosestPointAt( cosineBaseMax ).x;
    const leftMin = ( cosineBaseMin < this.xRange.min ) ? cosineBaseMin : this.getClosestPointAt( cosineBaseMin ).x;
    const rightMin = rightMax - edgeWidth;
    const leftMax = leftMin + edgeWidth;

    // Is the transition region to the left currently zero (or nearly zero)
    const isLeftRegionZero = this.isRegionZero( leftMin, leftMax );

    // Is the transition region to the right currently zero (or nearly zero)
    const isRightRegionZero = this.isRegionZero( rightMin, rightMax );

    this.points.forEach( point => {

      // Weight associated with the sinusoidal function:  0<=P<=1
      // P=1 corresponds to a pure sinusoidal function (overriding the previous function)
      // whereas P=0 gives all the weight to the initial (saved) function/curve (sinusoidal function has no effect).
      let P: number;

      if ( point.x >= leftMax && point.x <= rightMin ) {

        // In the inner region, always have a pure sinusoidal, weight of 1
        P = 1;
      }
      else if ( point.x > leftMin && point.x < leftMax ) {

        // In the outer region to the left P transitions from 0 to 1, unless it is empty, in which case it is 1
        P = isLeftRegionZero ? 1 : weightFunction( point, leftMax, leftMin );
      }
      else if ( point.x > rightMin && point.x < rightMax ) {

        // In the outer region to the right P transitions from 1 to 0, unless it is empty, in which case it is 1
        P = isRightRegionZero ? 1 : weightFunction( point, rightMin, rightMax );
      }
      else {

        // Outside the cosine base, the weight is zero
        P = 0;
      }

      // Assign the y value with the correct weight
      point.y = P * cosineFunction( point.x ) + ( 1 - P ) * point.lastSavedY;

      // Assign the point type
      this.updatePointType( point, P );
    } );

    // If the left region was zero and within the range of the curve, then the sinusoidal function will have a kink.
    // So we must tag the cusps at the left edge of the curve in that case
    if ( isLeftRegionZero && ( cosineBaseMin > this.xRange.min ) ) {
      const index = this.getClosestIndexAt( leftMin );
      this.points[ index ].pointType = 'cusp';
      if ( this.points[ index + 1 ] ) {
        this.points[ index + 1 ].pointType = 'cusp';
      }
    }

    // If the right region was zero and within the range of the curve, then the sinusoidal function will have a kink on the right side
    // So we must tag the cusps at the right edge of the curve in that case.
    if ( isRightRegionZero && ( cosineBaseMax < this.xRange.max ) ) {
      const index = this.getClosestIndexAt( rightMax );
      this.points[ index ].pointType = 'cusp';
      if ( this.points[ index - 1 ] ) {
        this.points[ index - 1 ].pointType = 'cusp';
      }
    }
  }

  /**
   * Allows the user to drag Points in the Curve to any desired position to create customs but smooth shapes.
   * This method will update the curve with the new position value. It attempts to create a smooth curve
   * between position and antepenultimatePosition.
   * The main goal of the drawToForm method is to create a curve segment that is smooth enough that it can be
   * twice differentiable without generating discontinuities.
   *
   * @param position - in model coordinates
   * @param penultimatePosition - in model coordinates
   * @param antepenultimatePosition - in model coordinates
   */
  private drawFreeformToPosition( position: Vector2,
                                  penultimatePosition: Vector2 | null,
                                  antepenultimatePosition: Vector2 | null ): void {

    // Closest point associated with the position
    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    closestPoint.y = position.y;

    // Point associated with the last drag event
    if ( penultimatePosition ) {
      const lastPoint = this.getClosestPointAt( penultimatePosition.x );

      // We want to create a straight line between this point and the last drag event point
      const closestVector = closestPoint.getVector();
      this.interpolate( closestVector.x, closestVector.y, lastPoint.x, penultimatePosition.y );
    }
    else {

      // There is no position associated with the last drag event.
      // Let's create a hill with a narrow width at the closestPoint.
      // See https://github.com/phetsims/calculus-grapher/issues/218
      this.createHillAt( WEE_WIDTH, closestPoint.x, closestPoint.y );
    }

    if ( penultimatePosition && antepenultimatePosition ) {

      const lastPoint = this.getClosestPointAt( penultimatePosition.x );

      // Point associated with the last drag event
      const nextToLastPoint = this.getClosestPointAt( antepenultimatePosition.x );

      // Checks that lastPoint is in between closestPoint and nextToLastPoint
      if ( ( closestPoint.x - lastPoint.x ) * ( nextToLastPoint.x - lastPoint.x ) < 0 ) {

        // Finds two control points that are approximately midway between our three points
        const cp1Point = this.getClosestPointAt( ( position.x + penultimatePosition.x ) / 2 );
        const cp2Point = this.getClosestPointAt( ( penultimatePosition.x + antepenultimatePosition.x ) / 2 );

        // Check that the lastPoint is between cp1 and cp2
        if ( ( cp1Point.x - lastPoint.x ) * ( cp2Point.x - lastPoint.x ) < 0 ) {

          // x separation between two adjacent points in a curve array
          const deltaX = this.deltaX;

          // Vectors associated with the drag events.
          // Note that the x-values are the allowed CurvePoints x-values but the
          // y-values match the y value from the dragListener
          const v1 = new Vector2( nextToLastPoint.x, antepenultimatePosition.y );
          const v2 = new Vector2( lastPoint.x, penultimatePosition.y );
          const v3 = new Vector2( closestPoint.x, position.y );

          // Are we dragging from left to right?
          const isAscending = nextToLastPoint.x < closestPoint.x;

          const sortedVectors = isAscending ? [ v1, v2, v3 ] : [ v3, v2, v1 ];

          // Piecewise function composed of the two linear functions.
          const piecewiseFunction = new CompletePiecewiseLinearFunction( sortedVectors );

          // Distance over which we will mollify the points
          const distance = Math.abs( cp2Point.x - cp1Point.x );
          const numberSteps = distance / deltaX;

          // Are we incrementing points from right to left or left to right?
          const signedDeltaX = isAscending ? deltaX : -deltaX;

          // A function of x used that will be used to mollify the piecewise function
          const mollifierFunction = this.mollifierFunction( distance );

          // Iterate over the intermediate x-values that need to be mollified.
          for ( let i = 0; i < numberSteps; i++ ) {

            // x value of the point that needs to be mollified
            const x = cp2Point.x + i * signedDeltaX;

            // Weight of the mollifier function
            let weight = 0;

            // Weight of the piecewiseFunction
            let functionWeight = 0;

            // Apply the mollifying algorithm on the point located at x by convoluting it with nearby points
            for ( let dx = -distance; dx < distance; dx += deltaX / 4 ) {
              weight += mollifierFunction( dx );
              functionWeight += mollifierFunction( dx ) * piecewiseFunction.evaluate( x + dx );
            }
            this.getClosestPointAt( x ).y = functionWeight / weight;
          }
        }
      }
    }

    // Assign type to points

    // Main idea: assign the smooth type to ALL points between penultimatePosition to position (
    // and possibly antepenultimatePosition if it exists), then come back to it by reassigning the
    // closestPoint (and the its point partner ahead of the drag) to be discontinuous.
    //
    if ( penultimatePosition ) {

      const lastPoint = this.getClosestPointAt( penultimatePosition.x );

      const lastPointIndex = this.getIndex( lastPoint );
      const closestPointIndex = this.getIndex( closestPoint );

      let min = Math.min( closestPointIndex, lastPointIndex );
      let max = Math.max( closestPointIndex, lastPointIndex );
      for ( let i = min; i <= max; i++ ) {
        this.points[ i ].pointType = 'smooth';
      }

      if ( antepenultimatePosition ) {

        // Point associated with the last drag event
        const nextToLastPoint = this.getClosestPointAt( antepenultimatePosition.x );

        const nextToLastPointIndex = this.getIndex( nextToLastPoint );

        min = Math.min( lastPointIndex, nextToLastPointIndex );
        max = Math.max( lastPointIndex, nextToLastPointIndex );

        for ( let i = min; i <= max; i++ ) {
          this.points[ i ].pointType = 'smooth';
        }
      }

      // Assign the current drag position to be discontinuous
      closestPoint.pointType = 'discontinuous';

      // We need to figure out what is the direction of the drag, and assign the point "ahead" to be discontinuous
      if ( lastPointIndex > closestPointIndex ) {
        this.getClosestPointAt( closestPoint.x - this.deltaX ).pointType = 'discontinuous';
      }
      else if ( lastPointIndex < closestPointIndex ) {
        this.getClosestPointAt( closestPoint.x + this.deltaX ).pointType = 'discontinuous';
      }
    }
  }

  /**
   * Returns a mollifier function of x, that is an infinitely differentiable function
   * Mollifier functions are used to smooth (a.k.a. mollify) other functions (see https://en.wikipedia.org/wiki/Mollifier)
   * @param width - the width for which the mollifying function does not return a zero value
   */
  private mollifierFunction( width: number ): MathFunction {
    assert && assert( width > 0, 'width must be positive' );
    return x => Math.abs( x ) < width / 2 ? Math.exp( 1 / ( ( x / ( width / 2 ) ) ** 2 - 1 ) ) : 0;
  }

  /**
   * Sets the y-value of points between position1 and position2 using a linear interpolation
   */
  private interpolate( x1: number, y1: number, x2: number, y2: number ): void {

    // x-separation between two adjacent points in a curve array
    const deltaX = this.deltaX;

    // x-distance between the new and old point
    const distX = Math.abs( x1 - x2 );

    const signedOne: number = ( x1 > x2 ) ? -1 : 1;

    // Perform a linear interpolation between position1 and position2
    for ( let dx = deltaX; dx < distX; dx += deltaX ) {

      // The xPosition of the point to be interpolated, is either to the left or right of position1
      const xPosition = x1 + signedOne * dx;

      // Weight needed to interpolate the y-values, weight will never exceed 1.
      const W = dx / distX;

      // Update the y value of an intermediate point
      this.getClosestPointAt( xPosition ).y = ( 1 - W ) * y1 + W * y2;
    }
  }

  /**
   * Are the y-values zero (or nearly zero) for the points between xMin and xMax.
   */
  private isRegionZero( xMin: number, xMax: number ): boolean {

    assert && assert( xMin <= xMax, 'xMin must be less than xMax' );

    return this.points.every( point => {

      const isOutsideBounds = point.x < xMin || point.x > xMax;

      return isOutsideBounds || Math.abs( point.lastSavedY ) < 1e-3;
    } );
  }

  /**
   * Update the type of a point to smooth if the weight associated to the new function is very large,
   * otherwise leave as is.
   */
  private updatePointType( point: CurvePoint, weight: number ): void {

    assert && assert( weight >= 0 && weight <= 1, `weight must range between 0 and 1: ${weight}` );

    // If the weight is very large, we have effectively replaced the previous values by the new function, which we know to be smooth.
    point.pointType = ( weight > UPPER_WEIGHT ) ? 'smooth' : point.lastSavedType;
  }

  /**
   * Update pointValue with appropriate weight, but if weight is very small leave as is.
   * (see https://github.com/phetsims/calculus-grapher/issues/261)
   */
  private updatePointValue( point: CurvePoint, weight: number, peakY: number ): void {

    assert && assert( weight >= 0 && weight <= 1, `weight must range between 0 and 1: ${weight}` );

    // If the weight is very small, we are practically ignoring the new function. Let's explicitly replace it by the lastSavedY instead.
    point.y = ( weight > LOWER_WEIGHT ) ? weight * peakY + ( 1 - weight ) * point.lastSavedY : point.lastSavedY;
  }

  /**
   * Applies the peak function to the curve points and updates their point type.
   * The peak function is applied within a subdomain of the curve.
   * This will result in a piecewise function iof the old  curve and new function.
   * No attempt is made to blend the peak function. We update the point type of the edge points in the
   * subdomains as discontinuous or cusps.
   *
   * @param peakFunction - the function to be applied to the curve
   * @param deltaY - the y offset of the drag
   */
  private iterateFunctionOverPoints( peakFunction: ( deltaY: number, x: number ) => number, deltaY: number ): void {

    let wasPreviousPointModified: boolean | null = null;
    this.points.forEach( ( point, index ) => {

      // New Y value, subject to conditions below
      const newY = peakFunction( deltaY, point.x );

      // Is the point within the 'width' and the change "larger" than the previous y value.
      const isModified = ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY );

      // Update the y value
      point.y = isModified ? newY : point.lastSavedY;

      // Update the point Type - we assume the interior region of the peak function is smooth
      // (this is not the case for TRIANGLE therefore we will need to correct it )
      point.pointType = isModified ? 'smooth' : point.lastSavedType;

      // Context: The updated y values will result in a piecewise function of the new function and the old y-values.
      // We need to identify the points where the transitions happen. Those points will be labeled cusps or discontinuities
      if ( wasPreviousPointModified !== null && wasPreviousPointModified !== isModified ) {

        // We always label discontinuities and cusps on an adjacent pair of points.
        const rightPoint = point;
        const leftPoint = this.points[ index - 1 ];

        // If the right point (point inside the new function) used to be discontinuous, leave type as is, Otherwise label it as cusp.
        rightPoint.pointType = rightPoint.lastSavedType === 'discontinuous' ? 'discontinuous' : 'cusp';

        // The left point should have the same pointType as its adjacent pair point
        leftPoint.pointType = rightPoint.pointType;

      }
      wasPreviousPointModified = isModified;

    } );
  }
}

calculusGrapher.register( 'TransformedCurve', TransformedCurve );
