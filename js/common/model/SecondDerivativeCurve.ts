// Copyright 2023, University of Colorado Boulder

/**
 * SecondDerivative is a Curve subclass for a curve that represents the second derivative of a 'base' curve.
 *
 * SecondDerivatives' main responsibility is to observe when the 'base' Curve changes and differentiates it and update
 * the Points of the second derivative.
 *
 * Like Curve, SecondDerivative is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and SecondDerivatives are never disposed.
 *
 * @author Martin Veillette
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from './Curve.js';

export default class SecondDerivativeCurve extends Curve {

  // Reference to the 'base' Curve that was passed-in.
  private readonly baseCurve: Curve;

  /**
   * @param baseCurve - the curve to differentiate to get the values of this SecondDerivative
   * @param tandem
   */
  public constructor( baseCurve: Curve, tandem: Tandem ) {

    super( {

      // CurveOptions
      xRange: baseCurve.xRange,
      numberOfPoints: baseCurve.numberOfPoints,
      tandem: tandem
    } );

    this.baseCurve = baseCurve;

    // Observes when the 'base' Curve changes and update this curve to represent the second derivative of the 'base' Curve.
    // Listener is never removed since SecondDerivative is never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateSecondDerivative.bind( this ) );

    // Makes the initial call to updateSecondDerivative() to match the 'base' Curve upon initialization.
    this.updateSecondDerivative();
  }

  /**
   * // REVIEW: This makes it sound like we're grabbing the derivative of the "base"/"original"
   * // REVIEW: curve. But we're actually grabbing the derivative of the OG curve derivative.
   * Updates the y-values of the SecondDerivative to represent the derivative of the 'base' Curve.
   *
   * To update the second derivative, we (1) assume that the points are smooth,
   * and evaluate the second derivative using the standard finite difference algorithm.
   * For points that are not smooth, we correct for the wrong assumption, by assigning
   * their second derivative to a smooth point directly next to it.
   *
   */
  private updateSecondDerivative(): void {

    // Convenience variables
    const basePoints = this.baseCurve.points;
    const length = basePoints.length;

    for ( let index = 0; index < length; index++ ) {

      // Is the base point smooth?
      const isBasePointSmooth = basePoints[ index ].pointType === 'smooth';

      // The point type is the same as the base point, unless the base point is not smooth, in which case it must be discontinuous
      this.points[ index ].pointType = isBasePointSmooth ? 'smooth' : 'discontinuous';

      // We exclude the first and last point. They will be dealt with later
      if ( index !== 0 && index !== length - 1 ) {
        const previousPoint = basePoints[ index - 1 ];
        const point = basePoints[ index ];
        const nextPoint = basePoints[ index + 1 ];

        // Determine the second derivative using the naive assumption that all points are smooth. We will handle exceptions later
        this.points[ index ].y = ( point.getSlope( nextPoint ) - point.getSlope( previousPoint ) ) / ( 2 * this.deltaX );
      }
    }

    // Handle the y value of the first and last point
    this.points[ 0 ].y = ( basePoints[ 1 ].pointType === 'smooth' ) ? this.points[ 1 ].y : 0;
    this.points[ length - 1 ].y = ( basePoints[ length - 2 ].pointType === 'smooth' ) ? this.points[ length - 2 ].y : 0;


    // Reiterate over points but this time taking into account the point type
    // Reassigning appropriate y value if the point type is not smooth
    for ( let index = 1; index < length - 1; index++ ) {

      // Points of the second derivative (this class), their point type is now correctly assigned
      const previousPoint = this.points[ index - 1 ];
      const point = this.points[ index ];
      const nextPoint = this.points[ index + 1 ];

      // If the point is discontinuous, we have evaluated its second derivative incorrectly.
      if ( point.isDiscontinuous ) {

        if ( nextPoint.isDiscontinuous ) {

          // The point and next point are not smooth, which means that the second derivative of this point
          // was not evaluated correctly. Update its yValue with the point left to it
          point.y = previousPoint.y;
        }

        if ( previousPoint.isDiscontinuous ) {

          // The point and previous point are not smooth, which means that the second derivative of this point
          // was not evaluated correctly. Update its yValue with the point right to it
          point.y = nextPoint.y;
        }
      }
    }

    // Signal once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }


}
calculusGrapher.register( 'SecondDerivativeCurve', SecondDerivativeCurve );
