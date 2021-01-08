import {
  url,
  move,
  apply,
  chain,
  template,
  mergeWith,
  Tree,
  Rule,
  SchematicContext,
  SchematicsException
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngIconLib(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceAsBuffer = tree.read('angular.json');
    if (!workspaceAsBuffer) {
      throw new SchematicsException('Not and Angular CLI workspace');
    }

    const workspace = JSON.parse(workspaceAsBuffer.toString());

    const projectName = _options.project || workspace.defaultProject;
    const project = workspace.projects[projectName];

    if (project.projectType === 'application') {
      throw new SchematicsException(
          'The "generateLibrary" schematics works only for the "library" projects, please specify correct project using --project flag'
      );
    }

    const path = _options.path || `${project.sourceRoot}/lib`;
    const parsed = parseName(path, _options.name);
    _options.name = parsed.name;
    const sourceTemplate = url('./files');

    const sourceTemplateParametrized = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings
      }),
      move(parsed.path)
    ]);

    const rules = [mergeWith(sourceTemplateParametrized)];

    /*
    if (_options.generateModule || _options.generateComponent) {
      rules.push(
          externalSchematic('@schematics/angular', 'module', {
            ...moduleSchematicsOptions,
            project: projectName
          })
      );
    }

    if (_options.generateComponent) {
      rules.push(
          externalSchematic('@schematics/angular', 'component', {
            ...componentSchematicsOptions,
            project: projectName
          })
      );
    }
     */
    return chain(rules);
  }
}
