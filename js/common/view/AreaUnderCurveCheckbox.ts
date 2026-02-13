// Copyright 2023-2026, University of Colorado Boulder

/**
 * AreaUnderCurveCheckbox is the checkbox labeled 'Area Under Curve', for making the area-under-curve feature visible.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AreaUnderCurveScrubberNode from './AreaUnderCurveScrubberNode.js';
import CalculusGrapherCheckboxGroup from './CalculusGrapherCheckboxGroup.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.areaUnderCurveCheckbox;

export default class AreaUnderCurveCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const icon = AreaUnderCurveScrubberNode.createIcon();

    const text = new RichText( CalculusGrapherFluent.checkbox.areaUnderCurveStringProperty, {
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
        enabledProperty: DerivedProperty.not( predictEnabledProperty ),
        accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
        accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: ACCESSIBLE_STRINGS.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: ACCESSIBLE_STRINGS.accessibleContextResponseUncheckedStringProperty,
        phetioDisplayOnlyPropertyInstrumented: true,
        tandem: tandem
      } ) );
  }
}

calculusGrapher.register( 'AreaUnderCurveCheckbox', AreaUnderCurveCheckbox );