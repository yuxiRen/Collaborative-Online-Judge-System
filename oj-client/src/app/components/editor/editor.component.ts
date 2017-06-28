import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: string = 'Java';
  languages: string[] = ['Java', 'C++', 'Python'];
  sessionId: string;
  defaultContent = {
    'Java': `public class Example {
public static void main(String[] args) {
    // Type your Java code here
    }
}`,
    'C++': `#include <iostream>
using namespace std;
int main() {
  // Type your C++ code here
  return 0;
}`,
    'Python': `class Solution:
   def example():
       # Write your Python code here`
  }
  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.problem = this.data.getProblem(+params['id']);
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.setFontSize(18);

    this.editor.$blockScrolling = Infinity;

    // this.editor.getSession().setMode('ace/mode/java');
    // this.editor.setValue(this.defaultContent['Java']);
    this.resetEditor();
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e) => {
      console.log('Editor Component: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  resetEditor(): void {
    console.log('Resetting editor');
    this.editor.getSession().setMode(`ace/mode/${this.language.toLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  setLanguage(language: string) {
    this.language = language;
    // add a map for language and js file name
    // this.editor.getSession().setMode(`ace/mode/${language.toLowerCase()}`);
    // this.editor.setValue(this.defaultContent[language]);
    this.resetEditor();
  }

  submit() {
    let userCodes = this.editor.getValue();
    console.log('submit....' + userCodes);
  }
}
