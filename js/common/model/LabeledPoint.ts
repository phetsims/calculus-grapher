// Copyright 2023, University of Colorado Boulder

/**
 * LabeledPoint is the model element for a labeled point on a curve. These elements can only be made visible
 * via PhET-iO, or via the (developer) query parameter 'labeledPointsVisible'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Curve from './Curve.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, ColorProperty } from '../../../../scenery/js/imports.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  pointColor: Color;
};

type LabeledPointOptions = SelfOptions & PickRequired<LabeledAncillaryToolOptions, 'x' | 'label' | 'tandem'>;

export default class LabeledPoint extends LabeledAncillaryTool {

  // Color to be used for displaying the point
  public readonly pointColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: LabeledPointOptions ) {

    const options = optionize<LabeledPointOptions, SelfOptions, LabeledAncillaryToolOptions>()( {

      // LabeledAncillaryToolOptions
      visible: CalculusGrapherQueryParameters.labeledPointsVisible
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.pointColorProperty = new ColorProperty( options.pointColor, {
      tandem: options.tandem.createTandem( 'pointColorProperty' )
    } );
  }

  /**
   * Creates a specified number of LabeledPoint instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createLabeledPoints( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                     derivativeCurve: Curve, secondDerivativeCurve: Curve,
                                     parentTandem: Tandem ): LabeledPoint[] {
    return LabeledAncillaryTool.createLabeledAncillaryTools( numberOfTools,
      ( x: number, label: string ) =>
        new LabeledPoint( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
          x: x,
          label: label,
          pointColor: CalculusGrapherColors.originalCurveStrokeProperty.value,
          tandem: parentTandem.createTandem( `${label}Point` )
        } ) );
  }
}

calculusGrapher.register( 'LabeledPoint', LabeledPoint );
