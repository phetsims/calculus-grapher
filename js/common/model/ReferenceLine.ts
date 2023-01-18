// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLine is the model element for the reference line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = EmptySelfOptions;

type ReferenceLineOptions = SelfOptions & PickRequired<AncillaryToolOptions, 'tandem'>;

export default class ReferenceLine extends AncillaryTool {

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: ReferenceLineOptions ) {

    const options = optionize<ReferenceLineOptions, SelfOptions, AncillaryToolOptions>()( {

      // AncillaryToolOptions
      x: CalculusGrapherConstants.CURVE_X_RANGE.getCenter()
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );
  }
}

calculusGrapher.register( 'ReferenceLine', ReferenceLine );
