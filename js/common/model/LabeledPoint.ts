// Copyright 2023-2026, University of Colorado Boulder

/**
 * LabeledPoint is the model element for a labeled point on a curve. These elements can only be made visible
 * via PhET-iO, or via the (private) query parameter 'labeledPointsVisible'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Color from '../../../../scenery/js/util/Color.js';
import ColorProperty from '../../../../scenery/js/util/ColorProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import DerivativeCurve from './DerivativeCurve.js';
import IntegralCurve from './IntegralCurve.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import OriginalCurve from './OriginalCurve.js';
import PredictCurve from './PredictCurve.js';
import SecondDerivativeCurve from './SecondDerivativeCurve.js';

type SelfOptions = {
  pointColor: Color;
};

type LabeledPointOptions = SelfOptions & PickRequired<LabeledAncillaryToolOptions, 'x' | 'label' | 'tandem'>;

export default class LabeledPoint extends LabeledAncillaryTool {

  // Color to be used for displaying the point
  public readonly pointColorProperty: ColorProperty;

  public constructor( integralCurve: IntegralCurve,
                      originalCurve: OriginalCurve,
                      predictCurve: PredictCurve,
                      derivativeCurve: DerivativeCurve,
                      secondDerivativeCurve: SecondDerivativeCurve,
                      providedOptions: LabeledPointOptions ) {

    const options = optionize<LabeledPointOptions, SelfOptions, LabeledAncillaryToolOptions>()( {

      // LabeledAncillaryToolOptions
      visible: CalculusGrapherQueryParameters.labeledPointsVisible
    }, providedOptions );

    super( integralCurve, originalCurve, predictCurve, derivativeCurve, secondDerivativeCurve, options );

    this.pointColorProperty = new ColorProperty( options.pointColor, {
      tandem: options.tandem.createTandem( 'pointColorProperty' )
    } );
  }

  /**
   * Creates a specified number of LabeledPoint instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createLabeledPoints( numberOfTools: number,
                                     integralCurve: IntegralCurve,
                                     originalCurve: OriginalCurve,
                                     predictCurve: PredictCurve,
                                     derivativeCurve: DerivativeCurve,
                                     secondDerivativeCurve: SecondDerivativeCurve,
                                     parentTandem: Tandem ): LabeledPoint[] {
    return LabeledAncillaryTool.createLabeledAncillaryTools( numberOfTools,
      ( x: number, label: string ) =>
        new LabeledPoint( integralCurve, originalCurve, predictCurve, derivativeCurve, secondDerivativeCurve, {
          x: x,
          label: label,
          pointColor: CalculusGrapherColors.primaryCurveStrokeProperty.value,
          tandem: parentTandem.createTandem( `${label}Point` )
        } ) );
  }
}

calculusGrapher.register( 'LabeledPoint', LabeledPoint );