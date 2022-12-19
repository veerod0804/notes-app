import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewInit {

  @Input('title')
  title!: string;
  @Input('body')
  body!: string;

  @ViewChild('truncator') truncator: any | ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText:any |ElementRef<HTMLElement> ;

  constructor(private renderer: Renderer2) { }


  ngAfterViewInit() {
    //work out if there is a text overflow and if not, then hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      //if there is a text to overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block;');
    } else {
      // else (there is no text overflow), hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

}
