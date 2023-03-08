// Copyright 2023, University of Colorado Boulder

/**
 * GridCheckbox is the checkbox used to show/hide the grid for the graphs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import GridIcon from '../../../../scenery-phet/js/GridIcon.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

export default class GridCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>, tandem: Tandem ) {

    super( scrubberVisibleProperty, new GridIcon(), combineOptions<CheckboxOptions>(
      {}, CalculusGrapherConstants.CHECKBOX_OPTIONS, {
        tandem: tandem
      } ) );
  }
}

calculusGrapher.register( 'GridCheckbox', GridCheckbox );