// Copyright 2020-2023, University of Colorado Boulder

/**
 * IntegralCurve is a Curve subclass for the curve that represents the integral of originalCurve.
 * IntegralCurve's main responsibility is to observe when the Curve changes and integrate it and update the
 * Points of the Integral. For a general background on integration, see https://en.wikipedia.org/wiki/Integral. Our
 * version uses a trapezoidal Riemann sum to approximate integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule
 * for background. Since the originalCurve exists at all Points, the Integral is also finite at all points.
 *
 * Like Curve, IntegralCurve is created at the start and persists for the lifetime of the simulation. Links are left
 * as-is and IntegralCurves are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import Curve from './Curve.js';

export default class IntegralCurve extends Curve {

  // Reference to the originalCurve that was passed-in.
  private readonly originalCurve: Curve;

  /**
   * @param originalCurve - the curve to integrate to get the values of this IntegralCurve.
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

    // Observes when the originalCurve changes and update this curve to represent the integral of the originalCurve.
    // Listener is never removed since IntegralCurves are never disposed.
    originalCurve.curveChangedEmitter.addListener( this.updateIntegral.bind( this ) );

    // Makes the initial call to update the integral to match the originalCurve upon initialization.
    this.updateIntegral();
  }

  /**
   * Updates the y-values of the IntegralCurve to represent the integral of the originalCurve.
   *
   * The integral is approximated by performing a Riemann Sum.  A left Riemann Sum is used
   * to determine the area from a series of rectangles to approximate the area under a curve. The left Riemann Sum
   * uses the left side of the function for the height of the rectangle summing up all
   * trapezoidal areas. See https://en.wikipedia.org/wiki/Riemann_sum for more details.
   */
  private updateIntegral(): void {

    // Loop through each adjacent pair of points on the original curve.
    for ( let index = 1; index < this.originalCurve.points.length; index++ ) {
      const point = this.originalCurve.points[ index ];
      const previousPoint = this.originalCurve.points[ index - 1 ];

      assert && assert( point.isFinite && previousPoint.isFinite );

      // Takes the integral from the minimum of curve the x-domain to the x-value of the current point using a
      // trapezoidal Riemann sum approximation. See https://en.wikipedia.org/wiki/Trapezoidal_rule for background.
      const trapezoidalArea = 0.5 * ( point.y + previousPoint.y ) * ( point.x - previousPoint.x );

      // Sanity check that verifies that the area is well-defined at the current Point.
      assert && assert( Number.isFinite( trapezoidalArea ) && point.isFinite, 'non-finite trapezoidal area' );

      // Let's add the trapezoidalArea to the previous y-value to get the y-value of the current Point.
      this.points[ index ].y = this.points[ index - 1 ].y + trapezoidalArea;

      // An integral smooths out a point discontinuity into a cusp and a cusp into a smooth.
      this.points[ index ].pointType = point.isDiscontinuous ? 'cusp' : 'smooth';
    }

    // Signals once that this Curve has changed.
    this.curveChangedEmitter.emit();
  }
}

calculusGrapher.register( 'IntegralCurve', IntegralCurve );
