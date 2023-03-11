// Copyright 2023, University of Colorado Boulder

/**
 * LabeledLine is the model element for a labeled line tool. This is tool consists of a vertical line with a label
 * positioned at the top of the line.  These elements can only be made visible via PhET-iO, or via the (developer)
 * query parameter 'labeledLinesVisible'.
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

type LabeledLineOptions = SelfOptions & PickRequired<LabeledAncillaryToolOptions, 'x' | 'label' | 'tandem'>;

export default class LabeledLine extends LabeledAncillaryTool {

  // Color for displaying the vertical line
  public readonly lineColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: LabeledLineOptions ) {

    const options = optionize<LabeledLineOptions, SelfOptions, LabeledAncillaryToolOptions>()( {

      // LabeledAncillaryToolOptions
      visible: CalculusGrapherQueryParameters.labeledLinesVisible
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.lineColorProperty = new ColorProperty( Color.black, {
      tandem: options.tandem.createTandem( 'lineColorProperty' )
    } );
  }

  /**
   * Creates a specified number of LabeledLine instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createLabeledLines( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                     derivativeCurve: Curve, secondDerivativeCurve: Curve,
                                     parentTandem: Tandem ): LabeledLine[] {
    return LabeledAncillaryTool.createLabeledAncillaryTools( numberOfTools,
      ( x: number, label: string ) =>
        new LabeledLine( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
          x: x,
          label: label,
          tandem: parentTandem.createTandem( `${label}Line` )
        } ) );
  }
}

calculusGrapher.register( 'LabeledLine', LabeledLine );
