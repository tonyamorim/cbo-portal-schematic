import { Rule, SchematicContext, Tree, apply, url, template, move, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';

export function createProject(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }),
      move(path.join('./', options.name))
    ]);
    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };
}
