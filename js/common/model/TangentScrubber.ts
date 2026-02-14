// Copyright 2023-2026, University of Colorado Boulder

/**
 * TangentScrubber is the model element for the tangent scrubber. It can be moved horizontally to position the
 * tangent line on the original curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AncillaryTool from './AncillaryTool.js';
import DerivativeCurve from './DerivativeCurve.js';
import IntegralCurve from './IntegralCurve.js';
import OriginalCurve from './OriginalCurve.js';
import PredictCurve from './PredictCurve.js';
import SecondDerivativeCurve from './SecondDerivativeCurve.js';

export default class TangentScrubber extends AncillaryTool {

  // See phetioDocumentation for addLinkedElement( this.colorProperty ) below
  public readonly colorProperty: ProfileColorProperty;

  public constructor( integralCurve: IntegralCurve,
                      originalCurve: OriginalCurve,
                      predictCurve: PredictCurve,
                      derivativeCurve: DerivativeCurve,
                      secondDerivativeCurve: SecondDerivativeCurve,
                      tandem: Tandem ) {

    super( integralCurve, originalCurve, predictCurve, derivativeCurve, secondDerivativeCurve, {
      x: Math.floor( CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 3 ),

      // Do not feature these Properties in Studio, because they are not relevant for tangent,
      // see https://github.com/phetsims/calculus-grapher/issues/225
      yIntegralPropertyFeatured: false,
      yPredictPropertyFeatured: false,
      ySecondDerivativePropertyFeatured: false,
      tandem: tandem
    } );

    this.colorProperty = CalculusGrapherColors.derivativeCurveStrokeProperty;

    this.addLinkedElement( this.colorProperty, {
      tandemName: 'colorProperty'
    } );

    this.addLinkedElement( this.yDerivativeProperty, {
      tandemName: 'slopeProperty'
    } );
  }
}

calculusGrapher.register( 'TangentScrubber', TangentScrubber );