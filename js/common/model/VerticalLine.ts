// Copyright 2023, University of Colorado Boulder

/**
 * VerticalLine is the model element for a vertical line tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Curve from './Curve.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, ColorProperty } from '../../../../scenery/js/imports.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherQueryParameters from '../CalculusGrapherQueryParameters.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type VerticalLineOptions = SelfOptions & PickRequired<LabeledAncillaryToolOptions, 'x' | 'label' | 'tandem'>;

export default class VerticalLine extends LabeledAncillaryTool {

  public readonly lineColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: VerticalLineOptions ) {

    const options = optionize<VerticalLineOptions, SelfOptions, LabeledAncillaryToolOptions>()( {

      // LabeledAncillaryToolOptions
      visible: CalculusGrapherQueryParameters.verticalLinesVisible
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.lineColorProperty = new ColorProperty( Color.black, {
      tandem: options.tandem.createTandem( 'lineColorProperty' )
    } );
  }

  /**
   * Creates a specified number of VerticalLine instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createVerticalLines( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                     derivativeCurve: Curve, secondDerivativeCurve: Curve,
                                     parentTandem: Tandem ): VerticalLine[] {
    return LabeledAncillaryTool.createLabeledAncillaryTools( numberOfTools,
      ( x: number, label: string ) =>
        new VerticalLine( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
          x: x,
          label: label,
          tandem: parentTandem.createTandem( `${label}VerticalLine` )
        } ) );
  }
}

calculusGrapher.register( 'VerticalLine', VerticalLine );
