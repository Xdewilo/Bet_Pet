// animations/cart.animations.ts
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const cartAnimations = {
  fadeSlide: trigger('fadeSlide', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(100%)' }),
      animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 1, transform: 'translateX(0%)' })
      )
    ]),
    transition(':leave', [
      animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 0, transform: 'translateX(100%)' })
      )
    ])
  ]),

  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 1, transform: 'scale(1)' })
      )
    ]),
    transition(':leave', [
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 0, transform: 'scale(0.95)' })
      )
    ])
  ]),

  listAnimation: trigger('listAnimation', [
    // Mantener el enter animation como está
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(60, [
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ], { optional: true })
    ])
  ]),

  itemAnimation: trigger('itemAnimation', [
    transition(':leave', [
      animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ 
          opacity: 0,
          height: 0,
          marginBottom: 0,
          transform: 'scale(0.95)',
          overflow: 'hidden'
        })
      )
    ])
  ]),

  loadingAnimation: trigger('loadingAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 1, transform: 'scale(1)' })
      )
    ]),
    transition(':leave', [
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', 
        style({ opacity: 0, transform: 'scale(0.8)' })
      )
    ])
  ])
};