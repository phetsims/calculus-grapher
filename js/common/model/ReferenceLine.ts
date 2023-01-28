// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLine is the model element for the reference line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import calculusGrapher from '../../calculusGrapher.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class ReferenceLine extends AncillaryTool {

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      tandem: Tandem ) {

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
      x: CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'ReferenceLine', ReferenceLine );
