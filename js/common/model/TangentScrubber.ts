// Copyright 2023, University of Colorado Boulder

/**
 * TangentScrubber is the model element for the tangent scrubber. It can be moved horizontally to position the
 * tangent line on the original curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import calculusGrapher from '../../calculusGrapher.js';
import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class TangentScrubber extends AncillaryTool {

  // See phetioDocumentation for addLinkedElement( this.colorProperty ) below
  public readonly colorProperty: ProfileColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      tandem: Tandem ) {

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
      x: Math.floor( CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 3 ),

      // Do not feature integral and second derivative in Studio, because they are not relevant for tangent,
      // see https://github.com/phetsims/calculus-grapher/issues/225
      yIntegralPropertyFeatured: false,
      ySecondDerivativePropertyFeatured: false,
      tandem: tandem
    } );

    this.colorProperty = CalculusGrapherColors.derivativeCurveStrokeProperty;

    this.addLinkedElement( this.colorProperty, {
      tandem: tandem.createTandem( 'colorProperty' ),
      phetioDocumentation: 'Color for the tangent scrubber handle, vertical line, and the bar in the "Slope of Tangent" accordion box.'
    } );

    this.addLinkedElement( this.yDerivativeProperty, {
      tandem: tandem.createTandem( 'slopeProperty' ),
      phetioDocumentation: 'The slope of the tangent line, with is the same as yDerivativeProperty.'
    } );
  }
}

calculusGrapher.register( 'TangentScrubber', TangentScrubber );
