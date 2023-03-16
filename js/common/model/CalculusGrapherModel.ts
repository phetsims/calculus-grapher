// Copyright 2020-2023, University of Colorado Boulder

/**
 * CalculusGrapherModel is the base class for the top-level model of every screen in the 'Calculus Grapher' simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import DerivativeCurve from './DerivativeCurve.js';
import SecondDerivativeCurve from './SecondDerivativeCurve.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntegralCurve from './IntegralCurve.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CurveManipulationMode from './CurveManipulationMode.js';
import CurveManipulationProperties from './CurveManipulationProperties.js';
import TransformedCurve from './TransformedCurve.js';
import TModel from '../../../../joist/js/TModel.js';
import GraphType from './GraphType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import ReferenceLine from './ReferenceLine.js';
import LabeledLine from './LabeledLine.js';
import LabeledPoint from './LabeledPoint.js';
import GraphSet from './GraphSet.js';
import CalculusGrapherPreferences from './CalculusGrapherPreferences.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = {

  // Identifies the graphs that are supported by the screen associated with this model, and should therefore
  // be instrumented for PhET-iO.
  graphSets: GraphSet[];

  // Initial graph set selected, must be a member of graphSets
  graphSet?: GraphSet;

  // Identifies the curve manipulation modes that are supported by the screen associated with this model.
  curveManipulationModeChoices?: CurveManipulationMode[];

  // Should the model create a TangentScrubber?
  hasTangentScrubber?: boolean;

  // Should the model create an AreaUnderCurveScrubber?
  hasAreaUnderCurveScrubber?: boolean;
};

export type CalculusGrapherModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CalculusGrapherModel implements TModel {

  // The graph sets that are supported by this model
  public readonly graphSets: GraphSet[];

  // The graphSet that is currently selected and displayed
  public readonly graphSetProperty: Property<GraphSet>;

  // Properties associated with curve manipulation
  public readonly curveManipulationProperties: CurveManipulationProperties;

  // Whether the 'Predict' radio button is selected
  public readonly predictSelectedProperty: Property<boolean>;

  // Whether the 'Predict' feature is enabled for the original graph.
  // The Predict preferences must be turned on, and the Predict radio button must be selected.
  public readonly predictEnabledProperty: TReadOnlyProperty<boolean>;

  // Controls visibility of grid lines on all graphs
  public readonly gridVisibleProperty: Property<boolean>;

  // The curve that appears as f(x) or f(t), depending on the 'Variable' preference setting.
  // The user can manipulate this curve by clicking of click-dragging in the graph.
  // The decision to call it the 'original' curve is documented in https://github.com/phetsims/calculus-grapher/issues/119
  public readonly originalCurve: TransformedCurve;

  // The curve that appears when the user has turned on the 'Predict' preference setting, and has selected the
  // Predict radio button that appears in the control panel. This curve can also be manipulated by the user.
  // Its purpose is to facilitate predicting what originalCurve looks like, based on seeing one or more of the
  // derived curves.
  public readonly predictCurve: TransformedCurve;

  // These curves are derived, not manipulated by the user.
  public readonly derivativeCurve: DerivativeCurve;
  public readonly integralCurve: IntegralCurve;
  public readonly secondDerivativeCurve: SecondDerivativeCurve;

  // Indicates which curve (originalCurve or predictCurve) is being modified by the user.
  public readonly interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>;

  // Model elements for the various tools
  public readonly referenceLine: ReferenceLine;
  public readonly labeledPoints: LabeledPoint[];
  public readonly labeledLines: LabeledLine[];

  // If subclasses add additional tools, use this as the parent tandem for those tools.
  protected readonly toolsTandem: Tandem;

  // These exist so that we have something to PhET-iO link to from the view.
  // See https://github.com/phetsims/calculus-grapher/issues/198
  public readonly labeledPointsLinkableElement: PhetioObject;
  public readonly labeledLinesLinkableElement: PhetioObject;

  protected constructor( providedOptions: CalculusGrapherModelOptions ) {

    const options = optionize<CalculusGrapherModelOptions, SelfOptions>()( {

      // SelfOptions
      graphSet: providedOptions.graphSets[ 0 ],
      curveManipulationModeChoices: CurveManipulationMode.enumeration.values,
      hasTangentScrubber: false,
      hasAreaUnderCurveScrubber: false
    }, providedOptions );

    assert && assert( options.graphSets.length > 0, 'there must be at least one valid graphSet' );
    assert && assert( _.every( options.graphSets, graphSet => graphSet.length === options.graphSets[ 0 ].length ),
      'all elements of graphSets must have the same length, a current limitation of this sim' );
    assert && assert( options.graphSets.includes( options.graphSet ) );

    this.graphSets = options.graphSets;

    this.graphSetProperty = new Property( options.graphSet, {
      validValues: options.graphSets,
      tandem: ( options.graphSets.length > 1 ) ? options.tandem.createTandem( 'graphSetProperty' ) : Tandem.OPT_OUT,
      phetioValueType: GraphSet.GraphSetIO,
      phetioDocumentation: 'Identifies the types of graphs that are displayed, and how they are grouped. ' +
                           'Radio buttons are available for choosing the desired set. See graphSetRadioButtonGroup.'
    } );

    this.curveManipulationProperties = new CurveManipulationProperties( options.curveManipulationModeChoices, {
      tandem: options.tandem.createTandem( 'curveManipulationProperties' )
    } );

    this.predictSelectedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'predictSelectedProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Whether the Predict radio button is selected. This will have no affect unless the ' +
                           'Predict preference is enabled.'
    } );

    this.predictEnabledProperty = DerivedProperty.and(
      [ CalculusGrapherPreferences.predictPreferenceEnabledProperty, this.predictSelectedProperty ], {
        tandem: options.tandem.createTandem( 'predictEnabledProperty' ),
        phetioValueType: BooleanIO,
        phetioFeatured: true,
        phetioDocumentation: 'Whether the Predict feature is enabled. ' +
                             'This is true only if the Predict preference is enabled, and the Predict radio button is selected.'
      } );

    this.gridVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'gridVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Controls the visibility of the grid lines for all graphs.'
    } );

    const curvesTandem = options.tandem.createTandem( 'curves' );

    this.originalCurve = new TransformedCurve( {
      // OriginalCurve is always instrumented, because it should always be present.
      tandem: curvesTandem.createTandem( 'originalCurve' ),
      phetioDocumentation: 'The curve that corresponds to the original function, f(x) or f(t)'
    } );

    this.predictCurve = new TransformedCurve( {
      // PredictCurve is always instrumented, because it should always be present.
      tandem: curvesTandem.createTandem( 'predictCurve' ),
      phetioDocumentation: 'The curve that corresponds to the student\'s prediction of the original function'
    } );

    this.interactiveCurveProperty = new DerivedProperty( [ this.predictEnabledProperty ],
      predictEnabled => predictEnabled ? this.predictCurve : this.originalCurve
    );

    // If graphSets includes graphType, then create a tandem, otherwise opt out.
    const createCurveTandem = ( graphType: GraphType ) => {
      return GraphSet.includes( this.graphSets, graphType ) ? curvesTandem.createTandem( graphType.tandemNamePrefix ) : Tandem.OPT_OUT;
    };

    this.derivativeCurve = new DerivativeCurve( this.originalCurve, createCurveTandem( GraphType.DERIVATIVE ) );
    this.secondDerivativeCurve = new SecondDerivativeCurve( this.originalCurve, createCurveTandem( GraphType.SECOND_DERIVATIVE ) );
    this.integralCurve = new IntegralCurve( this.originalCurve, createCurveTandem( GraphType.INTEGRAL ) );

    this.toolsTandem = options.tandem.createTandem( 'tools' );

    this.referenceLine = new ReferenceLine(
      this.integralCurve, this.originalCurve, this.derivativeCurve, this.secondDerivativeCurve,
      this.toolsTandem.createTandem( 'referenceLine' )
    );

    // This exists so that we have something we can link to from the view.
    // See https://github.com/phetsims/calculus-grapher/issues/198
    this.labeledPointsLinkableElement = new PhetioObject( {
      tandem: this.toolsTandem.createTandem( 'labeledPoints' ),
      phetioState: false
    } );

    // LabeledPoint instances, will appear to be children of 'labeledPoints' in the Studio tree.
    this.labeledPoints = LabeledPoint.createLabeledPoints(
      CalculusGrapherConstants.NUMBER_OF_LABELED_POINTS,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      this.labeledPointsLinkableElement.tandem );

    // This exists so that we have something we can link to from the view.
    // See https://github.com/phetsims/calculus-grapher/issues/198
    this.labeledLinesLinkableElement = new PhetioObject( {
      tandem: this.toolsTandem.createTandem( 'labeledLines' ),
      phetioState: false,
      phetioFeatured: true
    } );

    // LabeledLine instances, will appear to be children of 'labeledLines' in the Studio tree.
    this.labeledLines = LabeledLine.createLabeledLines(
      CalculusGrapherConstants.NUMBER_OF_LABELED_LINES,
      this.integralCurve,
      this.originalCurve,
      this.derivativeCurve,
      this.secondDerivativeCurve,
      this.labeledLinesLinkableElement.tandem );
  }

  /**
   * Reset all
   */
  public reset(): void {
    this.graphSetProperty.reset();
    this.originalCurve.reset();
    this.predictCurve.reset();
    this.curveManipulationProperties.reset();
    this.predictSelectedProperty.reset();
    this.gridVisibleProperty.reset();

    // Reset tools
    this.referenceLine.reset();
    // Do not reset this.labeledPoints, because they are configured only via PhET-iO.
    // Do not reset this.labeledLines, because they are configured only via PhET-iO.
  }
}
calculusGrapher.register( 'CalculusGrapherModel', CalculusGrapherModel );
