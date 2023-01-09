// Copyright 2023, University of Colorado Boulder

/**
 * LabelledAncillaryTool is an ancillary toll with a label.
 *
 * @author Martin Veillette
 */

import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import Curve from './Curve.js';

type SelfOptions = {
  label: string;
};

export type LabelledAncillaryToolOptions = SelfOptions & AncillaryToolOptions;

export default class LabelledAncillaryTool extends AncillaryTool {

  public readonly labelProperty: Property<string>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: LabelledAncillaryToolOptions ) {

    const options = optionize<LabelledAncillaryToolOptions, SelfOptions, AncillaryToolOptions>()(
      {}, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.labelProperty = new StringProperty( options.label,
      { tandem: options.tandem.createTandem( 'labelProperty' ) } );
  }
}
calculusGrapher.register( 'LabelledAncillaryTool', LabelledAncillaryTool );
