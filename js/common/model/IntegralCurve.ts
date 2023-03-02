// Copyright 2020-2023, University of Colorado Boulder

/**
 * IntegralCurve is a Curve subclass for the curve that represents the integral of the TransformedCurve. The TransformedCurve
 * is referenced as the 'base' Curve of the IntegralCurve.
 *
 * IntegralCurve's main responsibility is to observe when the 'base' Curve changes and integrate it and update the
 * Points of the Integral. For a general background on integration, see https://en.wikipedia.org/wiki/Integral. Our
 * version uses a trapezoidal Riemann sum to approximate integrals. See https://en.wikipedia.org/wiki/Trapezoidal_rule
 * for background. Since the 'base' Curve exists at all Points, the Integral is also finite at all points.
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

  // Reference to the 'base' Curve that was passed-in.
  private readonly baseCurve: Curve;

  /**
   * @param baseCurve - the curve to integrate to get the values of this IntegralCurve.
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

    // Observes when the 'base' Curve changes and update this curve to represent the integral of the 'base' Curve.
    // Listener is never removed since IntegralCurves are never disposed.
    baseCurve.curveChangedEmitter.addListener( this.updateIntegral.bind( this ) );

    // Makes the initial call to update the integral to match the 'base' Curve upon initialization.
    this.updateIntegral();
  }

  /**
   * Updates the y-values of the IntegralCurve to represent the integral of the 'base' Curve.
   *
   * The integral is approximated by performing a Riemann Sum.  A left Riemann Sum is used
   * to determine the area of a series of rectangles to approximate the area under a curve. The left Riemann Sum
   * uses the left side of the function for the height of the rectangle summing up all
   * trapezoidal areas. See https://en.wikipedia.org/wiki/Riemann_sum for more details.
   *
   * The IntegralCurve exists at all points since TransformedCurve is finite at all points, so we don't need to consider
   * non-differentiable or non-finite points of the 'base' curve.
   */
  private updateIntegral(): void {

    // Loop through each pair of adjacent Points of the base Curve.
    for ( let index = 1; index < this.baseCurve.points.length; index++ ) {
      const point = this.baseCurve.points[ index ];
      const previousPoint = this.baseCurve.points[ index - 1 ];

      assert && assert( point.isFinite && previousPoint.isFinite );

      // Takes the integral from the minimum of the domain of Curves to the x-value of the current point using a
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
