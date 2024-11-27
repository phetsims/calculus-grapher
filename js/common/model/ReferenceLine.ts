// Copyright 2023-2024, University of Colorado Boulder

/**
 * ReferenceLine is the model element for the reference line. This is vertical line that you can slide horizontally,
 * to place it where it's useful as a reference.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AncillaryTool from './AncillaryTool.js';
import Curve from './Curve.js';

export default class ReferenceLine extends AncillaryTool {

  // Color for the scrubber handle
  public readonly handleColorProperty: ProfileColorProperty;

  // Color for the vertical line
  public readonly lineColorProperty: ProfileColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      tandem: Tandem ) {

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {

      // A bit right of center, see https://github.com/phetsims/calculus-grapher/issues/248
      x: ( CalculusGrapherConstants.CURVE_X_RANGE.min + 0.55 * CalculusGrapherConstants.CURVE_X_RANGE.getLength() ),
      tandem: tandem
    } );

    this.handleColorProperty = CalculusGrapherColors.referenceLineHandleColorProperty;
    this.lineColorProperty = CalculusGrapherColors.referenceLineStrokeProperty;

    this.addLinkedElement( this.handleColorProperty, {
      tandemName: 'handleColorProperty'
    } );

    this.addLinkedElement( this.lineColorProperty, {
      tandemName: 'lineColorProperty'
    } );
  }
}

calculusGrapher.register( 'ReferenceLine', ReferenceLine );