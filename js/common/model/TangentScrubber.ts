// Copyright 2023, University of Colorado Boulder

/**
 * TangentScrubber is the model element for the tangent scrubber.
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

  // Color for the spherical scrubber
  public readonly colorProperty: ProfileColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      tandem: Tandem ) {

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
      x: Math.floor( CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 3 ),
      tandem: tandem
    } );

    this.colorProperty = CalculusGrapherColors.derivativeCurveStrokeProperty;

    this.addLinkedElement( this.colorProperty, {
      tandem: tandem.createTandem( 'colorProperty' ),
      phetioDocumentation: 'Color for the tangent line, scrubber, and the bar in the "Slope of Tangent" accordion box.'
    } );

    // Note: It would be nice to provide 'slopeProperty' as a link to 'yDerivativeProperty'. But element
    // 'yDerivativeProperty' is not the same as this.yDerivativeProperty, and we do not have access to it here.
    // See function createProperties in AncillaryTool.ts.
  }
}

calculusGrapher.register( 'TangentScrubber', TangentScrubber );
