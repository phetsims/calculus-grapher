// Copyright 2023, University of Colorado Boulder

/**
 * TangentScrubber is the model element for the tangent scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

type TangentScrubberOptions = SelfOptions & PickRequired<AncillaryToolOptions, 'tandem'>;

export default class TangentScrubber extends AncillaryTool {

  public readonly colorProperty: ProfileColorProperty;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: TangentScrubberOptions ) {

    const options = optionize<TangentScrubberOptions, SelfOptions, AncillaryToolOptions>()( {

      // AncillaryToolOptions
      x: CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 3
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.colorProperty = CalculusGrapherColors.derivativeCurveStrokeProperty;

    this.addLinkedElement( this.colorProperty, {
      tandem: options.tandem.createTandem( 'colorProperty' ),
      phetioDocumentation: 'Color for the tangent line, scrubber, and the bar in the "Slope of Tangent" accordion box.'
    } );
  }
}

calculusGrapher.register( 'TangentScrubber', TangentScrubber );
