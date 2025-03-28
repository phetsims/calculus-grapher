// Copyright 2023-2025, University of Colorado Boulder

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
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CalculusGrapherCheckboxGroup from './CalculusGrapherCheckboxGroup.js';
import ReferenceLineNode from './ReferenceLineNode.js';

export default class ReferenceLineCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const icon = ReferenceLineNode.createIcon();

    const text = new RichText( CalculusGrapherStrings.referenceLineStringProperty, {
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
        phetioDisplayOnlyPropertyInstrumented: true,
        tandem: tandem
      } ) );
  }
}

calculusGrapher.register( 'ReferenceLineCheckbox', ReferenceLineCheckbox );