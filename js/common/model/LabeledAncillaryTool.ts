// Copyright 2023, University of Colorado Boulder

/**
 * LabeledAncillaryTool is an ancillary tool with a label.
 *
 * @author Martin Veillette
 */

import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import Curve from './Curve.js';

type SelfOptions = {
  label: string;
};

export type LabeledAncillaryToolOptions = SelfOptions & AncillaryToolOptions;

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
   * Converts an integer in the range 0-25 to an uppercase letter in the range A-Z.
   * This is used to generate labels for tools.
   */
  public static intToUppercaseLetter( integer: number ): string {
    assert && assert( Number.isInteger( integer ), `must be an integer: ${integer}` );
    assert && assert( integer >= 0 && integer <= 25, `integer must range from 0 to 25: ${integer}` );
    return String.fromCharCode( integer + 'A'.charCodeAt( 0 ) );
  }
}

calculusGrapher.register( 'LabeledAncillaryTool', LabeledAncillaryTool );
