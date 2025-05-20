import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Tip {
  id: number;
  title: string;
  category: 'nutrition' | 'exercise';
  summary: string;
  content: string;
}

@Component({
  standalone: false,
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {
  tips: Tip[] = [
    {
      id: 1,
      title: '🥣 Café da Manhã Proteico e Barato',
      category: 'nutrition',
      summary: 'Uma opção acessível para começar o dia com energia!',
      content: `
        **Opção 1:**
        - 2 ovos cozidos ou mexidos  
        - 1 fatia de pão integral ou tapioca (2 colheres de sopa)  
        - 1 colher de sopa de pasta de amendoim ou requeijão light  
        - 1 banana ou outra fruta da estação  
        - 1 copo de leite integral ou desnatado (200ml)  

        **Macronutrientes:**
        - Proteína: ~20g  
        - Custo: R$4–6
      `
    },
    {
      id: 2,
      title: '☕ Café da Tarde Proteico e Barato',
      category: 'nutrition',
      summary: 'Um lanche prático para a tarde!',
      content: `
        **Opção 2:**
        - 1 omelete com 2 ovos e 1 colher de sopa de aveia  
        - 1 colher de chá de orégano e sal a gosto  
        - 1 copo de vitamina de banana com leite (200ml leite + 1 banana)  

        **Macronutrientes:**
        - Proteína: ~22g  
        - Custo: R$5–7
      `
    },
    {
      id: 3,
      title: '💪 Treino Rápido de 15 Minutos',
      category: 'exercise',
      summary: 'Exercícios intensos para o dia a dia!',
      content: `
        **Rotina:**
        - 3 séries de 15 agachamentos  
        - 3 séries de 10 flexões  
        - 3 séries de 20 abdominais  

        **Dicas:**
        - Faça com intensidade máxima  
        - Descanse 30 segundos entre séries
      `
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToTip(id: number): void {
    this.router.navigate(['/tips', id]);
  }
}