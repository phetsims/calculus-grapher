// Copyright 2023-2026, University of Colorado Boulder

/**
 * GridCheckbox is the checkbox used to show/hide the grid for the graphs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import GridIcon from '../../../../scenery-phet/js/GridIcon.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.gridCheckbox;

export default class GridCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>, tandem: Tandem ) {

    super( scrubberVisibleProperty, new GridIcon(), combineOptions<CheckboxOptions>(
      {}, CalculusGrapherConstants.CHECKBOX_OPTIONS, {
        isDisposable: false,
        accessibleName: ACCESSIBLE_STRINGS.accessibleNameStringProperty,
        accessibleHelpText: ACCESSIBLE_STRINGS.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: ACCESSIBLE_STRINGS.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: ACCESSIBLE_STRINGS.accessibleContextResponseUncheckedStringProperty,
        tandem: tandem
      } ) );
  }
}

calculusGrapher.register( 'GridCheckbox', GridCheckbox );