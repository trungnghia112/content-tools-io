import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import interact from 'interactjs';


@Component({
  selector: 'app-img-resizable',
  templateUrl: './img-resizable.component.html',
  styleUrls: ['./img-resizable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImgResizableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('imgDraggable') imgDraggable: ElementRef;
  @Input() logo = {
    src: '',
    top: 0,
    left: 0,
    width: 100
  };
  @Output() changePosition: EventEmitter<any> = new EventEmitter<any>(null);

  constructor() {
  }

  ngOnChanges() {
    if (this.logo) {
      this.init();
      console.log('this.logo:', this.logo);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    if (!this.imgDraggable) {
      return;
    }

    const target: any = this.imgDraggable.nativeElement;

    Object.assign(target.style, {
      transform: `translate(${this.logo.left}px, ${this.logo.top}px)`
    });
    Object.assign(target.dataset, {x: this.logo.left, y: this.logo.top});

    interact('.draggable')
      .resizable({
        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},

        listeners: {
          move: (event) => this.resizableMoveListener(event),
          end: (event) => this.updatePosition(event)
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: {width: 20, height: 20}
          }),

          interact.modifiers.aspectRatio()
        ],

        inertia: true
      })
      .draggable({
        listeners: {
          move: (event) => this.dragMoveListener(event),
          end: (event) => this.updatePosition(event)
        },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      });
  }

  private resizableMoveListener(event: any) {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  }

  private dragMoveListener(event: any) {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  private updatePosition(event: any) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0);
    const y = (parseFloat(target.getAttribute('data-y')) || 0);
    const body = {
      width: event.rect.width,
      height: event.rect.height,
      top: y,
      left: x,
      src: this.logo.src
    };
    console.log(body);
    this.changePosition.emit(body);
  }
}
