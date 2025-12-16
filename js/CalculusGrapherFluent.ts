// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from calculus-grapher-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import calculusGrapher from './calculusGrapher.js';
import CalculusGrapherStrings from './CalculusGrapherStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( CalculusGrapherStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'calculus_grapher_title', 'calculus-grapher.titleStringProperty' );
addToMapIfDefined( 'screen_derivative', 'screen.derivativeStringProperty' );
addToMapIfDefined( 'screen_integral', 'screen.integralStringProperty' );
addToMapIfDefined( 'screen_advanced', 'screen.advancedStringProperty' );
addToMapIfDefined( 'screen_lab', 'screen.labStringProperty' );
addToMapIfDefined( 'smooth', 'smoothStringProperty' );
addToMapIfDefined( 'symbol_d', 'symbol.dStringProperty' );
addToMapIfDefined( 'symbol_f', 'symbol.fStringProperty' );
addToMapIfDefined( 'symbol_x', 'symbol.xStringProperty' );
addToMapIfDefined( 'symbol_t', 'symbol.tStringProperty' );
addToMapIfDefined( 'discontinuities', 'discontinuitiesStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'notation', 'notationStringProperty' );
addToMapIfDefined( 'lagrange', 'lagrangeStringProperty' );
addToMapIfDefined( 'leibniz', 'leibnizStringProperty' );
addToMapIfDefined( 'variable', 'variableStringProperty' );
addToMapIfDefined( 'checkbox_areaUnderCurve', 'checkbox.areaUnderCurveStringProperty' );
addToMapIfDefined( 'checkbox_tangent', 'checkbox.tangentStringProperty' );
addToMapIfDefined( 'barometer_netSignedArea', 'barometer.netSignedAreaStringProperty' );
addToMapIfDefined( 'barometer_slopeOfTangent', 'barometer.slopeOfTangentStringProperty' );
addToMapIfDefined( 'predict', 'predictStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'predictPreference', 'predictPreferenceStringProperty' );
addToMapIfDefined( 'valuesPreferenceDescription', 'valuesPreferenceDescriptionStringProperty' );
addToMapIfDefined( 'referenceLine', 'referenceLineStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenButtonsHelpText', 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_playArea', 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_controlArea', 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_currentDetails', 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_interactionHint', 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenButtonsHelpText', 'a11y.integralScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_playArea', 'a11y.integralScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_controlArea', 'a11y.integralScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_currentDetails', 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_interactionHint', 'a11y.integralScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenButtonsHelpText', 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_playArea', 'a11y.advancedScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_controlArea', 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_currentDetails', 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_interactionHint', 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenButtonsHelpText', 'a11y.labScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_playArea', 'a11y.labScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_controlArea', 'a11y.labScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_currentDetails', 'a11y.labScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_interactionHint', 'a11y.labScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleName', 'a11y.gridCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleName', 'a11y.smoothButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleHelpText', 'a11y.smoothButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleName', 'a11y.eraserButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleHelpText', 'a11y.eraserButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleName', 'a11y.undoButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleHelpText', 'a11y.undoButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleName', 'a11y.eyeToggleButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleHelpText', 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleHelpText', 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleName', 'a11y.referenceLineCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleHelpText', 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleHelpText', 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_accessibleHelpText', 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictToggleSwitch_accessibleHelpText', 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleName', 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleHelpText', 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleName', 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleName', 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleName', 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleParagraph', 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleHeading', 'a11y.originalGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleParagraph', 'a11y.originalGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleHeading', 'a11y.integralGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleParagraph', 'a11y.integralGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleHeading', 'a11y.derivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleParagraph', 'a11y.derivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleHeading', 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleParagraph', 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleName', 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleHelpText', 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleName', 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleHelpText', 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentScrubber_accessibleName', 'a11y.tangentScrubber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_tangentScrubber_accessibleHelpText', 'a11y.tangentScrubber.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineScrubber_accessibleName', 'a11y.referenceLineScrubber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineScrubber_accessibleHelpText', 'a11y.referenceLineScrubber.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveScrubber_accessibleName', 'a11y.areaUnderCurveScrubber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveScrubber_accessibleHelpText', 'a11y.areaUnderCurveScrubber.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_headings_graphAreas', 'a11y.headings.graphAreasStringProperty' );
addToMapIfDefined( 'a11y_headings_curveManipulationControls', 'a11y.headings.curveManipulationControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_toolControls', 'a11y.headings.toolControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_tools', 'a11y.headings.toolsStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value.replace('\n','\n ')}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const CalculusGrapherFluent = {
  "calculus-grapher": {
    titleStringProperty: _.get( CalculusGrapherStrings, 'calculus-grapher.titleStringProperty' )
  },
  screen: {
    derivativeStringProperty: _.get( CalculusGrapherStrings, 'screen.derivativeStringProperty' ),
    integralStringProperty: _.get( CalculusGrapherStrings, 'screen.integralStringProperty' ),
    advancedStringProperty: _.get( CalculusGrapherStrings, 'screen.advancedStringProperty' ),
    labStringProperty: _.get( CalculusGrapherStrings, 'screen.labStringProperty' )
  },
  smoothStringProperty: _.get( CalculusGrapherStrings, 'smoothStringProperty' ),
  symbol: {
    dStringProperty: _.get( CalculusGrapherStrings, 'symbol.dStringProperty' ),
    fStringProperty: _.get( CalculusGrapherStrings, 'symbol.fStringProperty' ),
    xStringProperty: _.get( CalculusGrapherStrings, 'symbol.xStringProperty' ),
    tStringProperty: _.get( CalculusGrapherStrings, 'symbol.tStringProperty' )
  },
  discontinuitiesStringProperty: _.get( CalculusGrapherStrings, 'discontinuitiesStringProperty' ),
  valuesStringProperty: _.get( CalculusGrapherStrings, 'valuesStringProperty' ),
  notationStringProperty: _.get( CalculusGrapherStrings, 'notationStringProperty' ),
  lagrangeStringProperty: _.get( CalculusGrapherStrings, 'lagrangeStringProperty' ),
  leibnizStringProperty: _.get( CalculusGrapherStrings, 'leibnizStringProperty' ),
  variableStringProperty: _.get( CalculusGrapherStrings, 'variableStringProperty' ),
  checkbox: {
    areaUnderCurveStringProperty: _.get( CalculusGrapherStrings, 'checkbox.areaUnderCurveStringProperty' ),
    tangentStringProperty: _.get( CalculusGrapherStrings, 'checkbox.tangentStringProperty' )
  },
  barometer: {
    netSignedAreaStringProperty: _.get( CalculusGrapherStrings, 'barometer.netSignedAreaStringProperty' ),
    slopeOfTangentStringProperty: _.get( CalculusGrapherStrings, 'barometer.slopeOfTangentStringProperty' )
  },
  predictStringProperty: _.get( CalculusGrapherStrings, 'predictStringProperty' ),
  showStringProperty: _.get( CalculusGrapherStrings, 'showStringProperty' ),
  predictPreferenceStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceStringProperty' ),
  valuesPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'valuesPreferenceDescriptionStringProperty' ),
  predictPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceDescriptionStringProperty' ),
  referenceLineStringProperty: _.get( CalculusGrapherStrings, 'referenceLineStringProperty' ),
  a11y: {
    derivativeScreen: {
      screenButtonsHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' ), [{"name":"variable"}] ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    integralScreen: {
      screenButtonsHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_integralScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenButtonsHelpTextStringProperty' ), [{"name":"variable"}] ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    advancedScreen: {
      screenButtonsHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' ), [{"name":"variable"}] ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    labScreen: {
      screenButtonsHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_labScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenButtonsHelpTextStringProperty' ), [{"name":"variable"}] ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    gridCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleHelpTextStringProperty' ) )
    },
    smoothButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleHelpTextStringProperty' ) )
    },
    eraserButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleHelpTextStringProperty' ) )
    },
    undoButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleHelpTextStringProperty' ) )
    },
    eyeToggleButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' ) )
    },
    yZoomButtonGroup: {
      zoomInButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' ) )
      },
      zoomOutButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' ) )
      }
    },
    tangentCheckbox: {
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    referenceLineCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    areaUnderCurveCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' ) )
    },
    notationRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      lagrangeRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      leibnizRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    discontinuitiesRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      noLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' ) )
      },
      dashedLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    predictToggleSwitch: {
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictToggleSwitch_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    curveManipulationWidthSlider: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' ) )
    },
    curveManipulationModeRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      hillRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' ) )
      },
      triangleRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' ) )
      },
      pedestalRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' ) )
      },
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' ) )
      },
      sinusoidRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' ) )
      },
      freeformRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tiltRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' ) )
      },
      shiftRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    graphSetRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      integralRadioButton: {
        advanced: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleHelpTextStringProperty' ) )
        },
        lab: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleHelpTextStringProperty' ) )
        }
      },
      derivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      secondDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    slopeOfTangentAccordionBox: {
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' ) )
    },
    netSignedAreaAccordionBox: {
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' ) )
    },
    originalGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleParagraphStringProperty' ) )
    },
    integralGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleParagraphStringProperty' ) )
    },
    derivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleParagraphStringProperty' ) )
    },
    secondDerivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' ) )
    },
    predictRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      originalCurveRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' ) )
      },
      predictCurveRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    showOriginalCurveCheckbox: {
      accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' ), [{"name":"variable"}] ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseChecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseUnchecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ), [{"name":"variable"}] )
    },
    tangentScrubber: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentScrubber_accessibleName', _.get( CalculusGrapherStrings, 'a11y.tangentScrubber.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentScrubber_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentScrubber.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    referenceLineScrubber: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineScrubber_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineScrubber.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineScrubber_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineScrubber.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    areaUnderCurveScrubber: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveScrubber_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveScrubber.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveScrubber_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveScrubber.accessibleHelpTextStringProperty' ) )
    },
    headings: {
      graphAreasStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_graphAreas', _.get( CalculusGrapherStrings, 'a11y.headings.graphAreasStringProperty' ) ),
      curveManipulationControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_curveManipulationControls', _.get( CalculusGrapherStrings, 'a11y.headings.curveManipulationControlsStringProperty' ) ),
      toolControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_toolControls', _.get( CalculusGrapherStrings, 'a11y.headings.toolControlsStringProperty' ) ),
      toolsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_tools', _.get( CalculusGrapherStrings, 'a11y.headings.toolsStringProperty' ) )
    }
  }
};

export default CalculusGrapherFluent;

calculusGrapher.register('CalculusGrapherFluent', CalculusGrapherFluent);
