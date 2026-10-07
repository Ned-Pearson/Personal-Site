// Static content for project windows (Overview / Write-up / Media tabs).
// Keyed by the same id as the matching 'project' node in NODES.
// Placeholder copy — see Plan.md "Content status": replace before launch.

import todoAppOverview from '../assets/projects/todo-app/main-view.jpg'
import todoAppMyDay from '../assets/projects/todo-app/my-day.jpg'
import todoAppCustomList from '../assets/projects/todo-app/custom-list.jpg'
import todoAppCalendar from '../assets/projects/todo-app/calendar.jpg'
import todoAppTaskDetails from '../assets/projects/todo-app/task-details.jpg'
import todoAppAddTask from '../assets/projects/todo-app/add-task.jpg'
import todoAppHistory from '../assets/projects/todo-app/history.jpg'
import todoAppNotes from '../assets/projects/todo-app/notes.jpg'
import todoAppStats from '../assets/projects/todo-app/stats.jpg'
import colorectalModelComparison from '../assets/projects/colorectal-cancer-classification/model-comparison.png'
import wildfireF1Comparison from '../assets/projects/wildfire-intensity-prediction/f1-comparison.png'
import airbnbModelComparison from '../assets/projects/airbnb-price-prediction/model-comparison.png'
import adultIncomeModelComparison from '../assets/projects/adult-income-classification/model-comparison.png'
import adultIncomeNumericDistributions from '../assets/projects/adult-income-classification/fig1_numeric_distributions.png'
import adultIncomeNumericByClass from '../assets/projects/adult-income-classification/fig2_numeric_by_class.png'
import adultIncomeCategoricalRates from '../assets/projects/adult-income-classification/fig3_categorical_rates.png'
import adultIncomeCorrelation from '../assets/projects/adult-income-classification/fig4_correlation.png'
import adultIncomeModelComparisonFigure from '../assets/projects/adult-income-classification/fig5_model_comparison.png'
import adultIncomeThreshold from '../assets/projects/adult-income-classification/fig6_threshold.png'
import adultIncomeTestEvaluation from '../assets/projects/adult-income-classification/fig7_test_evaluation.png'
import adultIncomeImportance from '../assets/projects/adult-income-classification/fig8_importance.png'
import adultIncomeFairness from '../assets/projects/adult-income-classification/fig9_fairness.png'
import adultIncomeMitigation from '../assets/projects/adult-income-classification/fig10_mitigation.png'

export type ProjectStatus = 'shipped' | 'in progress' | 'archived'

export interface ProjectContent {
  id: string
  date: string
  status: ProjectStatus
  blurb: string
  tags: string[]
  writeUp: string[]
  /** Overview tab screenshot. Falls back to the striped placeholder when absent. */
  screenshotSrc?: string
  /** Natural width/height ratio of screenshotSrc — lets the window enforce a
   * minimum width so the image always renders at its natural size instead
   * of needing to shrink. Required whenever screenshotSrc is set. */
  screenshotAspect?: number
  media: { caption: string; src: string }[]
  sourceUrl?: string
  liveUrl?: string
}

export const PROJECTS: Record<string, ProjectContent> = {
  'todo-app': {
    id: 'todo-app',
    date: 'Aug 2026',
    status: 'shipped',
    screenshotSrc: todoAppOverview,
    screenshotAspect: 16 / 9,
    blurb:
      'A local-first desktop to-do app built with Tauri, React, and SQLite, with recurring tasks, tag inheritance, drag-and-drop, and a signed self-updater.',
    tags: ['Tauri', 'React', 'TypeScript', 'SQLite'],
    writeUp: [
      'A desktop to-do app I built for myself after one too many options were missing the features I wanted. It runs entirely on your machine: tasks, tags, recurring schedules, subtasks, and notes all live in a single SQLite file, with no account, no server, and no network calls required.',
      "Built with Tauri: a small Rust host process owns the window and the SQLite connection, while the interface itself is React and TypeScript rendered in the OS's native webview. That split keeps the binary a few MB and idle memory low next to an Electron app, at the cost of the frontend needing an explicit, capability-gated command for anything that touches the filesystem or database.",
      "A few pieces I'm proud of: tag inheritance for subtasks runs through a recursive SQL CTE rather than duplicated data, so untagging a parent instantly and correctly updates every descendant on the next read. Recurring tasks keep exactly one live row per series and project the rest on demand, and the app ships a self-updater with a signed release pipeline through GitHub Actions.",
      "There's no automated end-to-end test suite. Correctness instead leaned on a layered set of cheaper checks: TypeScript and Rust's own compiler catching whole classes of bugs at build time, a small Vitest suite for pure logic like date math and recurrence, and manual testing for everything UI-shaped. That held up fine solo, but wouldn't scale past one contributor.",
      "The biggest learning opportunity here was managing scope creep and planning more thoroughly up front. The app started as a simple day to day task list, and recurring schedules, subtasks, and tag inheritance were all added as I went rather than designed in from day one.",
      "A couple of sections needed a mid-project refactor once they had to support more than the original design allowed for. Recurrence outgrew its inline form fields and got extracted into its own module, and lists, originally just saved tag filters, had to be pulled apart from tags once they needed their own identity.",
      "Cloud sync and an iOS companion app are both deliberately deferred rather than built. They're genuinely interesting problems (conflict resolution across devices, Apple's provisioning and signing model), just not ones this particular project needed to answer to be worth shipping. I'd rather build a couple of different portfolio projects first than sink more months into this one alone.",
    ],
    media: [
      { caption: 'My day', src: todoAppMyDay },
      { caption: 'Custom list', src: todoAppCustomList },
      { caption: 'Calendar', src: todoAppCalendar },
      { caption: 'Task details', src: todoAppTaskDetails },
      { caption: 'Add task', src: todoAppAddTask },
      { caption: 'History', src: todoAppHistory },
      { caption: 'Notes', src: todoAppNotes },
      { caption: 'Stats', src: todoAppStats },
    ],
    sourceUrl: 'https://github.com/Ned-Pearson/todo-app',
  },
  'colorectal-cancer-classification': {
    id: 'colorectal-cancer-classification',
    date: 'Sem 1 2026',
    status: 'archived',
    screenshotSrc: colorectalModelComparison,
    screenshotAspect: 1660 / 590,
    blurb:
      'A histopathology image classifier comparing five approaches, from logistic regression to a CNN with transfer learning, built for an RMIT machine learning course.',
    tags: ['Python', 'scikit-learn', 'PyTorch'],
    writeUp: [
      'For this project I extracted and analysed a histopathology image dataset, then built and compared five approaches (logistic regression, SVM, CNN, CIFAR-10 transfer learning, and a majority-vote ensemble) across binary and four-class classification tasks.',
      "To keep evaluation honest I used a patient-level split to prevent data leakage, tuned hyperparameters systematically, and applied data augmentation that cut overfitting by 93%, which got the augmented CNN over the project's target. I also weighed each model's errors against real clinical cost and reported results that fell short of target rather than only the best-case numbers.",
      "This was completed as an individual assignment for a university machine learning course. As coursework, I'm not able to share the code or report publicly, so the write-up and media here cover what I built.",
    ],
    media: [],
  },
  'wildfire-intensity-prediction': {
    id: 'wildfire-intensity-prediction',
    date: 'Sem 1 2026',
    status: 'archived',
    screenshotSrc: wildfireF1Comparison,
    screenshotAspect: 1326 / 416,
    blurb:
      'A comparison of Decision Tree, SVM, and neural network classifiers for predicting wildfire intensity from historical data, built for an RMIT course.',
    tags: ['Python', 'scikit-learn'],
    writeUp: [
      'Built and compared Decision Tree, SVM, and neural network classifiers to predict wildfire intensity from historical data, with feature engineering, stratified evaluation, and per-class performance analysis to see where each model actually struggled rather than just an overall accuracy number.',
      "This was an individual assignment for a university course, so the code and report aren't something I can share publicly. The write-up and media here cover the approach and results.",
    ],
    media: [],
  },
  'airbnb-price-prediction': {
    id: 'airbnb-price-prediction',
    date: 'Sem 1 2026',
    status: 'archived',
    screenshotSrc: airbnbModelComparison,
    screenshotAspect: 1289 / 495,
    blurb: 'A price-prediction model for Airbnb listings, covering the full pipeline from data cleaning through to model evaluation.',
    tags: ['Python', 'scikit-learn'],
    writeUp: [
      'Developed a price-prediction model for Airbnb listings, covering the full pipeline: cleaning and preparing the raw data, engineering features, training models, and evaluating their performance.',
      "This was also an individual assignment for a university course, so I'm not able to share the code or report publicly. The write-up and media below cover what I built.",
    ],
    media: [],
  },
  'adult-income-classification': {
    id: 'adult-income-classification',
    date: 'Oct 2026',
    status: 'shipped',
    screenshotSrc: adultIncomeModelComparison,
    screenshotAspect: 1289 / 495,
    blurb:
      'A binary classifier on the UCI Adult census dataset predicting income above $50,000 a year, with calibrated decision thresholds and bootstrap-tested fairness diagnostics.',
    tags: ['Python', 'scikit-learn'],
    writeUp: [
      'A binary classification project on the UCI Adult census dataset, predicting whether a person earns above $50,000 a year. I picked a deliberately well known benchmark rather than something obscure, because the point was to do the whole pipeline properly on data where published results exist to check myself against, not to find a dataset nobody had touched.',
      "The model is a histogram gradient booster reaching a test ROC-AUC of 0.9273, which sits at parity with published figures for XGBoost on the same data. That number is not the interesting part. Every competent implementation lands in the same narrow band because the dataset has a hard information ceiling, and a grid search across 12 configurations moved ROC-AUC by 0.0005, which is about a third of the model's own fold to fold noise. The limiting factor is what the 12 features contain, not model capacity, and saying so felt more useful than presenting the search as if it had achieved something.",
      "A few pieces I'm happy with. Accuracy is the obvious metric here and it is actively misleading at a 24% positive rate, so rather than assert that I included a dummy classifier in the comparison table: 75.9% accuracy, F1 of exactly zero. The decision threshold is chosen from out of fold training predictions against a stated cost assumption rather than left at 0.5, and I checked calibration before running that cost analysis, since minimising expected cost is meaningless if the predicted probabilities do not correspond to real frequencies. The fairness section goes past diagnosis: deleting the protected attributes turns out to remove only about a third of the true positive rate gap because relationship is 13,192 of 13,193 male for Husband, whereas equal opportunity post processing eliminates the gap entirely for 0.79 accuracy points.",
      "The part I learned most from was getting a result wrong. An earlier draft used an arbitrary random split and reported that removing the proxy features made the disparity worse on both accuracy and fairness, which was a tidy and satisfying finding. Switching to the dataset's canonical train and test split and adding paired bootstrap confidence intervals killed it. The effect was smaller than what the test set could resolve, and I had been reading noise as signal. The report keeps that retraction in rather than quietly dropping it, because measuring the resolution of your test set before trusting a comparison is the actual lesson.",
      'Two honest gaps. Only the boosting model was tuned, so the comparison is a tuned model against two sensible defaults rather than a symmetric contest, and the equal opportunity thresholds were fitted for sex only. Extending them to race, or to intersections of the two, runs into much smaller subgroups and far less stable estimates, which is a harder problem than the one I solved and one I would rather do properly than gesture at.',
      "Worth saying plainly: this is 1994 census data and the $50,000 threshold is roughly $107,000 in today's terms. It is a benchmark for methodology and not a basis for decisions about anybody.",
    ],
    media: [
      { caption: 'Numerical feature distributions', src: adultIncomeNumericDistributions },
      { caption: 'Age, education, and hours by income class', src: adultIncomeNumericByClass },
      { caption: 'Positive rate by workclass, marital status, occupation, and relationship', src: adultIncomeCategoricalRates },
      { caption: 'Correlation matrix of numerical features and the target', src: adultIncomeCorrelation },
      { caption: 'Model comparison: ROC-AUC, and why accuracy misleads', src: adultIncomeModelComparisonFigure },
      { caption: 'Threshold selection: metrics and expected cost by threshold', src: adultIncomeThreshold },
      { caption: 'Test set evaluation: confusion matrix, ROC curve, and calibration', src: adultIncomeTestEvaluation },
      { caption: 'Permutation feature importance', src: adultIncomeImportance },
      { caption: 'Subgroup selection rate and true positive rate by sex and race', src: adultIncomeFairness },
      { caption: 'Equal opportunity thresholding: accuracy cost and TPR gap', src: adultIncomeMitigation },
    ],
  },
}
