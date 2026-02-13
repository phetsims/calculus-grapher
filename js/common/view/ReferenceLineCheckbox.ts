// Copyright 2023-2026, University of Colorado Boulder

/**
 * ReferenceLineCheckbox is the checkbox labeled 'Reference Line', for making the reference line scrubber visible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CalculusGrapherCheckboxGroup from './CalculusGrapherCheckboxGroup.js';
import ReferenceLineNode from './ReferenceLineNode.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.referenceLineCheckbox;

export default class ReferenceLineCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const icon = ReferenceLineNode.createIcon();

    const text = new RichText( CalculusGrapherFluent.referenceLineStringProperty, {
      font: CalculusGrapherConstants.CONTROL_FONT,
      maxWidth: CalculusGrapherCheckboxGroup.RICH_TEXT_MAX_WIDTH,
      maxHeight: CalculusGrapherCheckboxGroup.RICH_TEXT_MAX_HEIGHT,
      tandem: tandem.createTandem( 'text' )
    } );

    const box = new HBox( {
      children: [ icon, text ],
      spacing: 8
    } );

    super( scrubberVisibleProperty, box, combineOptions<CheckboxOptions>(
      {}, CalculusGrapherConstants.CHECKBOX_OPTIONS, {
        isDisposable: false,
        accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
        accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: ACCESSIBLE_STRINGS.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: ACCESSIBLE_STRINGS.accessibleContextResponseUncheckedStringProperty,
        phetioDisplayOnlyPropertyInstrumented: true,
        tandem: tandem
      } ) );
  }
}

calculusGrapher.register( 'ReferenceLineCheckbox', ReferenceLineCheckbox );