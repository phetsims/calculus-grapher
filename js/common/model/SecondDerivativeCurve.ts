// Copyright 2023, University of Colorado Boulder

/**
 * SecondDerivative is a Curve subclass for a curve that represents the second derivative of a Curve.
 * It is used to evaluate the second derivative of the originalCurve.
 *
 * SecondDerivatives' main responsibility is to observe when the originalCurve changes and differentiates it and update
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

  // Reference to the originalCurve that was passed-in.
  private readonly originalCurve: Curve;

  /**
   * @param originalCurve - the curve to differentiate to get the values of this SecondDerivative
   * @param tandem
   */
  public constructor( originalCurve: Curve, tandem: Tandem ) {

    super( {

      // CurveOptions
      xRange: originalCurve.xRange,
      numberOfPoints: originalCurve.numberOfPoints,
      tandem: tandem
    } );

    this.originalCurve = originalCurve;

    // Observes when the 'base' Curve changes and update this curve to represent the second derivative of the 'base' Curve.
    // Listener is never removed since SecondDerivative is never disposed.
    originalCurve.curveChangedEmitter.addListener( this.updateSecondDerivative.bind( this ) );

    // Makes the initial call to updateSecondDerivative() to match the 'base' Curve upon initialization.
    this.updateSecondDerivative();
  }

  /**
   * Updates the y-values and pointTypes for the SecondDerivative
   *
   * To update the second derivative, we (1) assume that the points are smooth,
   * and evaluate the second derivative using the standard finite difference algorithm.
   * (see central difference approximation of the second derivative in  https://en.wikipedia.org/wiki/Finite_difference )
   *
   * For points that are not smooth, we correct for this wrong assumption, by assigning
   * their second derivative to a smooth point directly next to it.
   */
  private updateSecondDerivative(): void {

    // Convenience variables
    const originalPoints = this.originalCurve.points;
    const length = originalPoints.length;

    for ( let index = 0; index < length; index++ ) {

      // Is the original point smooth?
      const isOriginalPointSmooth = originalPoints[ index ].pointType === 'smooth';

      // The point type is the same as the original point, unless the original point is not smooth, in which case it must be discontinuous
      this.points[ index ].pointType = isOriginalPointSmooth ? 'smooth' : 'discontinuous';

      // We exclude the first and last point. They will be dealt with later
      if ( index !== 0 && index !== length - 1 ) {
        const previousPoint = originalPoints[ index - 1 ];
        const point = originalPoints[ index ];
        const nextPoint = originalPoints[ index + 1 ];

        // Determine the second derivative using the naive assumption that all original points are smooth. We will handle exceptions later
        this.points[ index ].y = ( point.getSlope( nextPoint ) - point.getSlope( previousPoint ) ) / this.deltaX;
      }
    }

    // Handle the y value of the first and last point
    this.points[ 0 ].y = ( originalPoints[ 1 ].pointType === 'smooth' ) ? this.points[ 1 ].y : 0;
    this.points[ length - 1 ].y = ( originalPoints[ length - 2 ].pointType === 'smooth' ) ? this.points[ length - 2 ].y : 0;


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
