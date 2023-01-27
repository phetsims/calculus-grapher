// Copyright 2020-2023, University of Colorado Boulder

/**
 * TransformedCurve is a Curve sub-type for the main curve that the user interacts with and manipulates, which then
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

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import Curve, { CurveOptions } from './Curve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import CurvePoint from './CurvePoint.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import { PresetFunction } from './PresetFunctions.js';

// constants
const EDGE_SLOPE_FACTOR = CalculusGrapherQueryParameters.edgeSlopeFactor;
const STANDARD_DEVIATION = CalculusGrapherQueryParameters.smoothingStandardDeviation;
const MAX_TILT = CalculusGrapherQueryParameters.maxTilt;
const TYPICAL_Y = CalculusGrapherConstants.TYPICAL_Y;

type SelfOptions = EmptySelfOptions;

export type TransformedCurveOptions = SelfOptions & CurveOptions;

export default class TransformedCurve extends Curve {

  public constructor( providedOptions: TransformedCurveOptions ) {

    const options = optionize<TransformedCurveOptions, SelfOptions, CurveOptions>()( {

      // CurveOptions
      pointsPropertyReadOnly: false
    }, providedOptions );

    super( options );
  }

  // reset the curve points to their initial values
  public reset(): void {

    // Reset every CurvePoint to its initial state.
    this.points.forEach( point => point.reset() );

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Saves the current y-values of the Points for the next undoToLastSave() method.
   *
   * This method is invoked when the user starts manipulating the TransformedCurve. When the undo button is pressed,
   * the Points of the TransformedCurve will be set to their last saved state.
   */
  public saveCurrentPoints(): void {

    // Save the current y-value of each CurvePoint.
    this.points.forEach( point => point.save() );
  }

  /**
   * Creates a smooth, continuous, and differentiable bell-shaped curve, to the passed-in peak.
   */
  public createHillAt( width: number, peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    this.points.forEach( point => {

      const P = Math.exp( -Math.pow( ( point.x - closestPoint.x ) / ( width / ( 2 * Math.sqrt( 2 ) ) ), 2 ) );

      point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
    } );

  }

  /**
   * Creates a triangle-shaped peak that is non-differentiable where it intersects with the rest of the Curve.
   */
  public createTriangleAt( width: number, peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    // set the slope coefficient such that the base of the triangle at y=0 has a 'width' equal
    // to this.curveManipulationWidth when the peak is at typicalY value
    const slope = TYPICAL_Y / ( width / 2 );

    this.points.forEach( point => {
      const newY = peak.y - Math.sign( deltaY ) * slope * Math.abs( point.x - closestPoint.x );

      // If the point is within the 'width' of the triangle, modify the y position.
      // Otherwise , the point is not within the width and don't modify its position.
      if ( ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY ) ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
      }
    } );

  }

  /**
   * Creates a smooth and continuous trapezoidal-shaped curve with rounded corners.
   */
  public createPedestalAt( width: number, peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    // super gaussian function centered at `mu`, with min amplitude of 0 and max of 1;
    // use the square of a gaussian in order to have a very symmetric derivative at the edges
    const gaussianWeight = ( x: number, mu: number ) =>
      Math.exp( -1 * ( ( x - mu ) / EDGE_SLOPE_FACTOR ) ** 4 );

    this.points.forEach( point => {

      // weight for point transformation
      let P;

      if ( Math.abs( point.x - closestPoint.x ) < width / 2 ) {
        P = 1;
      }
      else if ( point.x <= closestPoint.x ) {

        // gaussian weight transitions smoothly from 0 to 1 as x increases
        P = gaussianWeight( point.x, closestPoint.x - width / 2 );
      }
      else {

        // must be to the right of closestPoint
        // gaussian weight transitions smoothly from 1 to 0 as x increases
        P = gaussianWeight( point.x, closestPoint.x + width / 2 );
      }

      point.y = P * peak.y + ( 1 - P ) * point.lastSavedY;
    } );

  }

  /**
   * Creates a quadratic that is non-differentiable where it intersects with the rest of the Curve.
   *
   */
  public createParabolaAt( width: number, peak: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( peak.x );

    // Amount to shift the CurvePoint closest to the passed-in peak.
    const deltaY = peak.y - closestPoint.lastSavedY;

    // set the parabola coefficient such that the parabola at y=0 has a 'width' equal
    // to this.curveManipulationWidth when the peak is at a typicalY value;
    const A = TYPICAL_Y * Math.pow( 2 / width, 2 );

    this.points.forEach( point => {
      const newY = peak.y - Math.sign( deltaY ) * A * Math.pow( point.x - closestPoint.x, 2 );

      // If the point is within the 'width' of the parabola, modify the y position.
      // Otherwise , the point is not within the width and don't modify its position.
      if ( ( deltaY > 0 && newY > point.lastSavedY ) || ( deltaY < 0 && newY < point.lastSavedY ) ) {
        point.y = newY;
      }
      else {
        point.y = point.lastSavedY;
      }
    } );
  }

  /**
   * Creates a sinusoidal wave with a varying amplitude based on the drag-position.
   */
  public createSinusoidalAt( width: number, position: Vector2 ): void {

    const closestPoint = this.getClosestPointAt( position.x );

    // wavelength associated with the sinusoidal function
    const wavelength = width;

    // cosine function to apply to points. cosine function passes through `position`
    const cosineFunction = ( x: number ) =>
      position.y * Math.cos( Math.PI * 2 * ( ( closestPoint.x - x ) ) / wavelength );

    // weight function that goes from 1 to 0 from HighX to LowX
    // the fact that it is a cosine function is happenstance
    const weightFunction = ( point: CurvePoint, highX: number, lowX: number ) =>
      Math.cos( Math.PI / 2 * ( point.x - highX ) / Math.abs( lowX - highX ) ) ** 2;

    // base width where we apply the sinusoidal function - ideally it should be an odd multiple of half wavelengths
    const cosineBase = 7 * ( wavelength / 2 );

    // width of the transition region to the left and right - ideally should be less than a quarter wavelength
    const edgeWidth = wavelength / 8;

    //             |<---------------cosineBase-------------------->|
    //   ----------|--------------|-----------------|--------------|----------
    //          leftMin        leftMax         rightMin        rightMax
    //   ----------|--------------|-----------------|--------------|----------
    //             |<-edgeWidth-->|                 |<-edgeWidth-->|

    // bounds to the transition regions to the right and the left for the sinusoidal function
    const rightMax = closestPoint.x + cosineBase / 2;
    const leftMin = closestPoint.x - cosineBase / 2;
    const rightMin = rightMax - edgeWidth;
    const leftMax = leftMin + edgeWidth;

    // is the transition region to the left currently zero (or nearly zero)
    const isLeftRegionZero = this.isRegionZero( leftMin, leftMax );

    // is the transition region to the right currently zero (or nearly zero)
    const isRightRegionZero = this.isRegionZero( rightMin, rightMax );

    this.points.forEach( point => {

        // weight associated with the sinusoidal function:  0<=P<=1
        // P=1 corresponds to a pure sinusoidal function (overriding the previous function)
        // whereas P=0 is only the previous function/curve (sinusoidal function has no effect).
        let P: number;

        if ( point.x >= leftMax && point.x <= rightMin ) {

          // in the inner region, always have a pure sinusoidal, weight of 1
          P = 1;
        }
        else if ( point.x > leftMin && point.x < leftMax ) {

          // in the outer region to the left P transitions from 0 to 1, unless it is empty, in which case it is 1
          P = isLeftRegionZero ? 1 : weightFunction( point, leftMax, leftMin );
        }
        else if ( point.x > rightMin && point.x < rightMax ) {

          // in the outer region to the right P transitions from 1 to 0, unless it is empty, in which case it is 1
          P = isRightRegionZero ? 1 : weightFunction( point, rightMin, rightMax );
        }
        else {

          // outside the cosine base, the weight is zero
          P = 0;
        }

        // assign the y value with the correct weight
        point.y = P * cosineFunction( point.x ) + ( 1 - P ) * point.lastSavedY;
      }
    );

  }

  /**
   * Allows the user to drag Points in the Curve to any desired position to create custom Curves shapes.
   * This method will update the curve with the new position value.
   *
   * TODO: add documentation
   * @param position - in model coordinates
   * @param penultimatePosition - in model coordinates
   * @param antepenultimatePosition - in model coordinates
   */
  public drawFreeformToPosition( position: Vector2,
                                 penultimatePosition: Vector2,
                                 antepenultimatePosition: Vector2 | null ): void {

    //  closest point associated with the position
    const closestPoint = this.getClosestPointAt( position.x );

    // Amount to shift the CurvePoint closest to the passed-in position.
    closestPoint.y = position.y;

    // point associated with the last drag event
    const lastPoint = this.getClosestPointAt( penultimatePosition.x );

    // TODO: explain why we dont want lastPoint
    this.interpolate( closestPoint.toVector(), new Vector2( lastPoint.x, penultimatePosition.y ) );

    if ( antepenultimatePosition instanceof Vector2
    ) {

      // point associated with the last drag event
      const nextToLastPoint = this.getClosestPointAt( antepenultimatePosition.x );

      // check that lastPoint is in between closestPoint and lastPoint
      if ( ( closestPoint.x - lastPoint.x ) * ( nextToLastPoint.x - lastPoint.x ) < 0 ) {

        // find two control points that are approximately midway between our three points
        const cp1Point = this.getClosestPointAt( ( closestPoint.x + lastPoint.x ) / 2 );
        const cp2Point = this.getClosestPointAt( ( nextToLastPoint.x + lastPoint.x ) / 2 );

        // check that the lastPoint is between cp1 and cp2
        if ( ( cp1Point.x - lastPoint.x ) * ( cp2Point.x - lastPoint.x ) < 0 ) {

          // x separation between two adjacent points in curve array
          const deltaX = this.deltaX;

          // x distance between cp1 and lastPoint
          const distXl = Math.abs( cp1Point.x - lastPoint.x );

          // x distance between the cp2 and lastPoint
          const distXR = Math.abs( cp2Point.x - lastPoint.x );

          // determine if cp1 is to the l
          const signedOne: number = ( cp1Point.x < lastPoint.x ) ? 1 : -1;

          // parameter of a quadratic equation
          const a = signedOne * ( cp1Point.x - 2 * lastPoint.x + cp2Point.x );
          const b = 2 * signedOne * ( -cp1Point.x + lastPoint.x );

          // we want to iterate over all the points between cp1 and cp2
          // and assign them a value associated with a quadratic Bezier curve
          // P(t) = (1-t^2)*cp1Point +2*(1-t)*lastPoint + t^2 cp2Point where t ranges from 0 to 1

          for ( let dx = deltaX; dx < distXl + distXR; dx += deltaX ) {

            // work backward by solving for the time, given a desired x position
            // by construction, there will always be two real roots for the time
            const roots = Utils.solveQuadraticRootsReal( a, b, -dx )!;

            // one of these roots will always be between [0,1], allow for a bit of rounding errors (see #92)
            const epsilon = 0.00001;
            const t = roots.filter( t => t >= -epsilon && t <= 1 + epsilon )[ 0 ];

            // sanity check
            assert && assert( t >= -epsilon && t <= 1 + epsilon, `t should be between 0 and 1 (inclusive): 
           ${roots[ 0 ]} and ${roots[ 1 ]}: a:${a}, b:${b}, c:${-dx}` );

            const xPosition = cp1Point.x + signedOne * dx;

            // update the y value: We need to use the y old point value as we iterate on an array of points that includes it.
            this.getClosestPointAt( xPosition ).y = ( 1 - t ) ** 2 * cp1Point.y +
                                                    2 * ( 1 - t ) * t * penultimatePosition.y +
                                                    ( t ** 2 ) * cp2Point.y;
          }
        }
      }
    }
  }

  public userManipulatedCurve( mode: CurveManipulationMode,
                               width: number,
                               position: Vector2,
                               penultimatePosition: Vector2,
                               antepenultimatePosition: Vector2 | null ): void {

    if ( mode === CurveManipulationMode.HILL ||
         mode === CurveManipulationMode.PARABOLA ||
         mode === CurveManipulationMode.PEDESTAL ||
         mode === CurveManipulationMode.TRIANGLE ||
         mode === CurveManipulationMode.SINE
    ) {
      this.widthManipulatedCurve( mode, width, position );
    }
    else if ( mode === CurveManipulationMode.TILT ||
              mode === CurveManipulationMode.SHIFT ) {
      this.positionManipulatedCurve( mode, position );
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
   *  set value of points between position1 and position2 using a linear interpolation
   */
  public interpolate( position1: Vector2, position2: Vector2 ): void {

    // x separation between two adjacent points in curve array
    const deltaX = this.deltaX;

    // x distance between the new and old point
    const distX = Math.abs( position1.x - position2.x );
    
    const signedOne: number = ( position1.x > position2.x ) ? -1 : 1;

    // perform a linear interpolation between position1 and position2
    for ( let dx = deltaX; dx < distX; dx += deltaX ) {

      // the xPosition of the point to be interpolated, is either to the left or right of position1
      const xPosition = position1.x + signedOne * dx;

      // weight needed to interpolate the y-values, weight will never exceed 1.
      const W = dx / distX;

      // update the y value of an intermediate point
      this.getClosestPointAt( xPosition ).y = ( 1 - W ) * position1.y + W * position2.y;
    }
  }

  /**
   * Shifts the curve to the specified drag Position.
   *
   * @param position - in model coordinates
   */
  public shiftToPosition( position: Vector2 ): void {

    // Amount to shift the entire curve.
    const deltaY = position.y - this.getClosestPointAt( position.x ).y;

    // Shift each of the CurvePoints by deltaY.
    this.points.forEach( point => {point.y += deltaY;} );
  }

  /**
   * Tilts the curve to the specified drag Position.
   *
   * @param position - in model coordinates
   */
  public tiltToPosition( position: Vector2 ): void {

    if ( position.x !== 0 ) {

      // Find the angle of the tilt, based on where the user dragged the Curve
      const angle = Math.atan( position.y / position.x );

      // clamped angle to be between a range set by MAX_TILT
      const clampedAngle = Utils.clamp( angle, -MAX_TILT, MAX_TILT );

      // Amount to shift the CurvePoint closest to the passed-in position.
      const deltaY = Math.tan( clampedAngle ) * position.x - this.getClosestPointAt( position.x ).lastSavedY;

      // Shift each of the CurvePoints by a factor of deltaY.
      this.points.forEach( point => { point.y = point.lastSavedY + deltaY * point.x / position.x;} );
    }
  }

  /**
   * sets the points for all the modes that can be manipulated through their width
   */
  public widthManipulatedCurve( mode: CurveManipulationMode,
                                width: number,
                                position: Vector2 ): void {

    if ( mode === CurveManipulationMode.HILL ) {
      this.createHillAt( width, position );
    }
    else if ( mode === CurveManipulationMode.PARABOLA ) {
      this.createParabolaAt( width, position );
    }
    else if ( mode === CurveManipulationMode.PEDESTAL ) {
      this.createPedestalAt( width, position );
    }
    else if ( mode === CurveManipulationMode.TRIANGLE ) {
      this.createTriangleAt( width, position );
    }
    else if ( mode === CurveManipulationMode.SINE ) {
      this.createSinusoidalAt( width, position );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }
  }

  /**
   * sets the points for all modes that can be manipulated solely through a position argument
   */
  public positionManipulatedCurve( mode: CurveManipulationMode,
                                   position: Vector2 ): void {

    if ( mode === CurveManipulationMode.TILT ) {
      this.tiltToPosition( position );
    }
    else if ( mode === CurveManipulationMode.SHIFT ) {
      this.shiftToPosition( position );
    }
    else {
      throw new Error( 'Unsupported Curve Manipulation Mode' );
    }
  }

  /**
   * Are the points between xMin and xMax have all y values of zero.
   */
  private isRegionZero( xMin: number, xMax: number ): boolean {

    assert && assert( xMin <= xMax, 'xMin must be less than xMax' );

    return this.points.every( point => {

      const isOutsideBounds = point.x < xMin || point.x > xMax;

      return isOutsideBounds || Math.abs( point.lastSavedY ) < 1e-3;
    } );
  }

  /**
   * Sets the y-values of this CurvedPoints of this Curve to its last saved state.
   *
   * This method is invoked when the undo button is pressed, which successively undos the last action.
   */
  public undoToLastSave(): void {

    // Revert to the saved y-value of each CurvePoint.
    this.points.forEach( point => point.undoToLastSave() );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Smooths the curve. Called when the user presses the 'smooth' button
   * This method uses a weighted-average algorithm for 'smoothing' a curve, using a gaussian kernel
   * see https://en.wikipedia.org/wiki/Kernel_smoother
   */
  public smooth(): void {

    // Save the current values of our Points for the next undoToLastSave call.
    // Note that the current y-values are the same as the previous y-values
    // for all Points in the TransformedCurve.
    this.saveCurrentPoints();

    // gaussian kernel that will be used in the convolution of our curve
    const gaussianFunction = ( x: number ) => Math.exp( -1 / 2 * ( x / STANDARD_DEVIATION ) ** 2 ) /
                                              ( STANDARD_DEVIATION * Math.sqrt( 2 * Math.PI ) );

    // Loop through each Point of the curve and set the new y-value.
    this.points.forEach( point => {

      // Flag that tracks the sum of the weighted y-values of all Points
      let weightedY = 0;
      let totalWeight = 0;

      // we want to use the kernel over a number of standard deviations
      // beyond 3 standard deviations, the kernel has a very small weight, less than 1%, so it becomes irrelevant.
      const numberOfStandardDeviations = 3;

      // Loop through each point on BOTH sides of the window, adding the y-value to our total.
      for ( let dx = -numberOfStandardDeviations * STANDARD_DEVIATION;
            dx < numberOfStandardDeviations * STANDARD_DEVIATION;
            dx += this.deltaX ) {

        // weight of the point
        const weight = gaussianFunction( dx );

        totalWeight += weight;

        // Add the Point's lastSavedY, which was the Point's y-value before the smooth() method was called.
        weightedY += this.getClosestPointAt( point.x + dx ).lastSavedY * weight;
      }

      // Set the Point's new y-value to the weighted average.
      point.y = weightedY / totalWeight;
    } );

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  public freeformIconCurve( yMin: number, yMax: number ): void {

    // convenience variables
    const xLength = this.xRange.getLength();
    const xMin = this.xRange.getMin();
    const width = xLength / 4;

    this.createHillAt( width, new Vector2( xMin + xLength / 5, yMin ) );
    this.saveCurrentPoints();
    this.createTriangleAt( width, new Vector2( xMin + 2 * xLength / 5, yMax ) );
    this.saveCurrentPoints();
    this.createParabolaAt( width, new Vector2( xMin + 3 * xLength / 5, yMin ) );
    this.saveCurrentPoints();
    this.createPedestalAt( width, new Vector2( xMin + 4 * xLength / 5, yMax ) );
  }

  /**
   * Apply a function
   */
  public applyMathFunction( presetFunction: PresetFunction ): void {

    if ( presetFunction.xPositions ) {
      const simplePoints = presetFunction.xPositions.map( x => new Vector2( x, presetFunction.mathFunction( x ) ) );
      this.applyFromSimplePoints( simplePoints );
    }
    else {
      this.points.forEach( point => { point.y = presetFunction.mathFunction( point.x );} );
    }

    // Signal that this Curve has changed.
    this.curveChangedEmitter.emit();
  }

  /**
   * Set the curve based on a linear interpolation from an array of Vector2 coordinates.
   */
  public applyFromSimplePoints( simplePoints: Vector2[] ): void {

    // construct allPoints by iterating over the simple points
    for ( let i = 1; i < simplePoints.length; i++ ) {
      const p1 = simplePoints[ i - 1 ];
      const p2 = simplePoints[ i ];

      // an array of simple points that interpolates between p1 and p2
      this.interpolate( p1, p2 );
    }
  }
}

calculusGrapher.register( 'TransformedCurve', TransformedCurve );
