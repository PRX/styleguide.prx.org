// From https://github.com/pleerock/ngx-tooltip#readme not maintained, recommended to fork
import {
  Directive,
  HostListener,
  ComponentRef,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver
} from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';

@Directive({
  selector: '[prxTooltip]'
})
export class TooltipDirective {
  private tooltip: ComponentRef<TooltipContentComponent>;
  private visible: boolean;

  constructor(private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

  @Input('prxTooltip')
  content: string;

  @Input()
  tooltipDisabled: boolean;

  @Input()
  tooltipAnimation = true;

  @Input()
  tooltipPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @HostListener('focusin')
  @HostListener('mouseenter')
  show(): void {
    if (this.tooltipDisabled || this.visible) {
      return;
    }

    this.visible = true;
    const factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
    this.tooltip = this.viewContainerRef.createComponent(factory);
    this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
    this.tooltip.instance.content = this.content as string;
    this.tooltip.instance.placement = this.tooltipPlacement;
    this.tooltip.instance.animation = this.tooltipAnimation;
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  hide(): void {
    if (!this.visible) {
      return;
    }

    this.visible = false;
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }
}
