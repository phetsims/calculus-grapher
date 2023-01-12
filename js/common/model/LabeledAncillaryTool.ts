// Copyright 2023, University of Colorado Boulder

/**
 * LabeledAncillaryTool is an ancillary tool with a label.
 *
 * @author Martin Veillette
 */

import Range from '../../../../dot/js/Range.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import Curve from './Curve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  label: string;
};

type LabeledAncillaryToolOptions = SelfOptions & AncillaryToolOptions;

export default class LabeledAncillaryTool extends AncillaryTool {

  public readonly labelProperty: Property<string>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: LabeledAncillaryToolOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.labelProperty = new StringProperty( options.label, {
      tandem: options.tandem.createTandem( 'labelProperty' )
    } );
  }

  /**
   * Creates a specified number of LabeledAncillaryTool instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createTools( numberOfTools: number,
                             integralCurve: Curve,
                             originalCurve: Curve,
                             derivativeCurve: Curve,
                             secondDerivativeCurve: Curve,
                             parentTandem: Tandem, tandemSuffix: string ): LabeledAncillaryTool[] {


    // Adjust the range so that we do not put tools at x-min and x-max.
    const range = new Range( CalculusGrapherConstants.CURVE_X_RANGE.min + 1, CalculusGrapherConstants.CURVE_X_RANGE.max - 1 );

    const tools: LabeledAncillaryTool[] = [];
    for ( let i = 0; i < numberOfTools; i++ ) {

      // convert integer to string 0->A, 1->B, etc
      const label = intToUppercaseLetter( i );

      // create a labeled ancillary tool with
      tools.push( new LabeledAncillaryTool( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
        label: label,
        initialCoordinate: range.expandNormalizedValue( i / numberOfTools ),
        tandem: parentTandem.createTandem( `${label}${tandemSuffix}` )
      } ) );
    }
    return tools;
  }
}

function intToUppercaseLetter( integer: number ): string {
  assert && assert( Number.isInteger( integer ), `must be an integer: ${integer}` );
  assert && assert( integer >= 0 && integer <= 25, `integer must range from 0 to 25: ${integer}` );
  return String.fromCharCode( integer + 'A'.charCodeAt( 0 ) );
}

calculusGrapher.register( 'LabeledAncillaryTool', LabeledAncillaryTool );
