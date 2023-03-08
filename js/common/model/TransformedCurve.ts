// Copyright 2020-2023, University of Colorado Boulder

/**
 * TransformedCurve is a Curve subclass for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the CurvePoints.
 *
 * TransformedCurve is mainly responsible for:
 *
 *   - Implementing the response algorithms that are used when the user drags on the TransformedCurve. The response is
 *     affected by the CurveManipulationMode and the 'width' of the curve-manipulation. The algorithms for curve
 *     manipulation response were adapted and improved from the flash implementation of Calculus Grapher.
 *
 *   - Saving the curve
 *   - Implementing smoothing, undoing, and other interactions.
 *   - Resetting all the points of the curve
 *  TransformedCurve is created at the start and persists for the lifetime of the simulation.
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
import { MathFunction, PresetFunction } from './PresetFunctions.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import CompletePiecewiseLinearFunction from '../../../../dot/js/CompletePiecewiseLinearFunction.js';

// constants
const EDGE_SLOPE_FACTOR = CalculusGrapherQueryParameters.edgeSlopeFactor;
const STANDARD_DEVIATION = CalculusGrapherQueryParameters.smoothingStandardDeviation;
const MAX_TILT = CalculusGrapherQueryParameters.maxTilt;
const TYPICAL_Y = CalculusGrapherConstants.TYPICAL_Y;
const WEE_WIDTH = CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 40;

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
   * Saves the current state ( y-value and pointType) of the Points for the next undoToLastSave() method.
   *
   * This method is invoked when the user starts manipulating the TransformedCurve. When the undo button is pressed,
   * the Points of the TransformedCurve will be set to their last saved state.
   */
  public saveCurrentPoints(): void {

    // Save the current state of each CurvePoint.
    this.points.forEach( point => point.save() );
  }

  /**
   * Smooths the curve. It is called when the user presses the 'smooth' button.
   * This method uses a weighted-average algorithm for 'smoothing' a curve, using a gaussian kernel
   * see https://en.wikipedia.org/wiki/Kernel_smoother
   */
  public smooth(): void {

    // Saves the current values of our Points for the next undoToLastSave call.
    // Note that the current y-values are the same as the previous y-values
    // for all Points in the TransformedCurve.
    this.saveCurrentPoints();

    // Normalized gaussian kernel that will be used in the convolution of our curve
    const normalizationFactor = 1 / ( STANDARD_DEVIATION * Math.sqrt( 2 * Math.PI ) );
    const gaussianFunction = ( x: number ) => normalizationFactor * Math.exp( -1 / 2 * ( x / STANDARD_DEVIATION ) ** 2 );

    // Loops through each Point of the curve and set the new y-value.
    this.points.forEach( point => {

      // Flag that tracks the sum over all points of the weighted y-values
      let weightedY = 0;
      let totalWeight = 0;

      // We want to use the kernel over a number of standard deviations.
      // Beyond 3 standard deviations, the kernel has a very small weight, less than 1%, so it becomes irrelevant.
      const numberOfStandardDeviations = 3;

      // Loops through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -numberOfStandardDeviations * STANDARD_DEVIATION;
            dx < numberOfStandardDeviations * STANDARD_DEVIATION;
            dx += this.deltaX ) {

        // Weight of the point
        const weight = gaussianFunction( dx );

        totalWeight += weight;

        // Add the Point's lastSavedY, which was the Point's y-value before the smooth() method was called.
        weightedY += this.getClosestPointAt( point.x + dx ).lastSavedY * weight;
      }

      // Set the Point's new y-value to the weighted average.
      point.y = weightedY / totalWeight;

      // Set all points to smooth type;
      point.pointType = 'smooth';
    } );

    // Signals that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

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
   * Shifts the curve to the specified drag position, in model coordinates.
   */
  public shiftToPosition( x: number, y: number ): void {

    // Amount to shift the entire curve.
    const deltaY = y - this.getClosestPointAt( x ).y;

    // Shift each of the CurvePoints by deltaY.
    this.points.forEach( point => {point.y += deltaY;} );
  }

  /**
   * Creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   */
  private createPedestalAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    // Super gaussian function centered at `mu`, with min amplitude of 0 and max of 1;
    // use the square of a gaussian in order to have a very symmetric derivative at the edges
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

      point.y = P * peakY + ( 1 - P ) * point.lastSavedY;

      this.updatePointType( point, P );

    } );
  }

  /**
   * Sets the state of this CurvedPoint on this Curve to its last saved state.
   * This method is invoked when the undo button is pressed, which successively undoes the last action.
   */
  public undoToLastSave(): void {

    // Revert to the saved pointState of each CurvePoint.
    this.points.forEach( point => point.undoToLastSave() );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
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
   * Applies a preset function.
   */
  public applyPresetFunction( presetFunction: PresetFunction ): void {

    if ( presetFunction.xPositions ) {
      const simplePoints = presetFunction.xPositions.map( x => new Vector2( x, presetFunction.mathFunction( x ) ) );
      this.applyFromSimplePoints( simplePoints );
    }
    else {
      this.points.forEach( point => { point.y = presetFunction.mathFunction( point.x );} );
    }

    // Assign the appropriate types to all points
    this.assignType();

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Creates a smooth, continuous, and differentiable bell-shaped curve, to the passed-in peak.
   */
  private createHillAt( width: number, peakX: number, peakY: number ): void {

    const closestPoint = this.getClosestPointAt( peakX );

    this.points.forEach( point => {

      // Determine the weight associated with the peak
      const P = Math.exp( -Math.pow( ( point.x - closestPoint.x ) / ( width / ( 2 * Math.sqrt( 2 ) ) ), 2 ) );

      point.y = P * peakY + ( 1 - P ) * point.lastSavedY;

      this.updatePointType( point, P );
    } );
  }

  /**
   * Update type of a point to smooth if the weight associated to the new function is very large,
   * otherwise leave as is.
   */
  private updatePointType( point: CurvePoint, weight: number ): void {

    point.pointType = ( weight > 0.99 ) ? 'smooth' : point.lastSavedType;
  }

  private iterateFunctionOverPoints( peakFunction: ( deltaY: number, x: number ) => number, deltaY: number ): void {

    let wasPreviousPointModified: boolean | null = null;
    this.points.forEach( ( point, index ) => {

      // New Y value, subject to conditions below
      const newY = peakFunction( deltaY, point.x );

      // Is the point within the 'width' and the change "larger" than the previous y value.
      const isModified = ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY );

      point.y = isModified ? newY : point.lastSavedY;

      point.pointType = isModified ? 'smooth' : point.lastSavedType;

      if ( wasPreviousPointModified !== null && wasPreviousPointModified !== isModified ) {
        point.pointType = 'cusp';
        this.points[ index - 1 ].pointType = 'cusp';
      }

      wasPreviousPointModified = isModified;
    } );
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

    this.iterateFunctionOverPoints( peakFunction, deltaY );
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


    this.iterateFunctionOverPoints( peakFunction, deltaY );

    closestPoint.pointType = 'cusp';
    this.getClosestPointAt( peakX + this.deltaX ).pointType = 'cusp';

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
    const rightMax = closestPoint.x + cosineBase / 2;
    const leftMin = closestPoint.x - cosineBase / 2;
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

      this.updatePointType( point, P );
    } );

    if ( isLeftRegionZero ) {
      const index = this.getClosestIndexAt( leftMin );
      this.points[ index ].pointType = 'cusp';
      if ( this.points[ index - 1 ] ) {
        this.points[ index - 1 ].pointType = 'cusp';
      }
    }

    if ( isRightRegionZero ) {
      const index = this.getClosestIndexAt( rightMax );
      this.points[ index ].pointType = 'cusp';
      if ( this.points[ index + 1 ] ) {
        this.points[ index + 1 ].pointType = 'cusp';
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

      closestPoint.pointType = 'discontinuous';
      if ( lastPoint.x > closestPoint.x ) {
        this.getClosestPointAt( position.x - this.deltaX ).pointType = 'discontinuous';
      }
      else {
        this.getClosestPointAt( position.x + this.deltaX ).pointType = 'discontinuous';
      }
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

      // Checks that lastPoint is in between closestPoint and lastPoint
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
            this.getClosestPointAt( x ).pointType = 'smooth';
          }
        }
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

  public freeformIconCurve( yMin: number, yMax: number ): void {

    // Convenience variables
    const xLength = this.xRange.getLength();
    const xMin = this.xRange.getMin();
    const width = xLength / 4;

    this.createHillAt( width, xMin + xLength / 5, yMin );
    this.saveCurrentPoints();
    this.createTriangleAt( width, xMin + 2 * xLength / 5, yMax );
    this.saveCurrentPoints();
    this.createParabolaAt( width, xMin + 3 * xLength / 5, yMin );
    this.saveCurrentPoints();
    this.createPedestalAt( width, xMin + 4 * xLength / 5, yMax );
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
   * Sets the curve based on a linear interpolation from an array of Vector2 coordinates.
   */
  private applyFromSimplePoints( simplePoints: Vector2[] ): void {

    // Assigns simplePoints to the curve point
    simplePoints.forEach( simplePoint => {

      // set position of the two outside points
      this.getClosestPointAt( simplePoint.x ).y = simplePoint.y;
    } );

    // Assigns intermediate curve points by iterating over a pair of simple points
    for ( let i = 1; i < simplePoints.length; i++ ) {
      const p1 = simplePoints[ i - 1 ];
      const p2 = simplePoints[ i ];

      // An array of simple points that interpolates between p1 and p2
      this.interpolate( p1.x, p1.y, p2.x, p2.y );
    }
  }
}

calculusGrapher.register( 'TransformedCurve', TransformedCurve );
