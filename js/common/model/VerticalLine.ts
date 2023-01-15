// Copyright 2023, University of Colorado Boulder

/**
 * VerticalLine is the model element for a vertical line tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, ColorProperty } from '../../../../scenery/js/imports.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Range from '../../../../dot/js/Range.js';

const TANDEM_SUFFIX = 'VerticalLine';

type SelfOptions = EmptySelfOptions;

type VerticalLineOptions = SelfOptions & LabeledAncillaryToolOptions;

export default class VerticalLine extends LabeledAncillaryTool {

  public readonly lineColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: VerticalLineOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.lineColorProperty = new ColorProperty( Color.black, {
      tandem: options.tandem.createTandem( 'lineColorProperty' )
    } );
  }

  /**
   * Creates a specified number of VerticalLine instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createMultiple( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                derivativeCurve: Curve, secondDerivativeCurve: Curve, parentTandem: Tandem ): VerticalLine[] {

    // Adjust the range so that we do not put tools at x-min and x-max.
    const range = new Range( CalculusGrapherConstants.CURVE_X_RANGE.min + 1, CalculusGrapherConstants.CURVE_X_RANGE.max - 1 );

    const tools: VerticalLine[] = [];
    for ( let i = 0; i < numberOfTools; i++ ) {

      // convert integer to string 0->A, 1->B, etc
      const label = VerticalLine.intToUppercaseLetter( i );

      // create the tool
      tools.push( new VerticalLine( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
        label: label,
        initialCoordinate: range.expandNormalizedValue( i / numberOfTools ),
        tandem: parentTandem.createTandem( `${label}${TANDEM_SUFFIX}` )
      } ) );
    }
    return tools;
  }
}

calculusGrapher.register( 'VerticalLine', VerticalLine );
