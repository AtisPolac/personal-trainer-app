import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tip } from '../tips/tips.component';

@Component({
  standalone: false,
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.component.html',
  styleUrls: ['./tip-detail.component.scss']
})
export class TipDetailComponent implements OnInit {
  tip: Tip | undefined;

  private tips: Tip[] = [
    {
      id: 1,
      title: '🥣 Café da Manhã Proteico e Barato',
      category: 'nutrition',
      summary: 'Uma opção deliciosa e acessível para começar o dia com energia!',
      content: `
        **Ingredientes:**

        - 2 ovos cozidos ou mexidos  
        - 1 fatia de pão integral ou tapioca (2 colheres de sopa)  
        - 1 colher de sopa de pasta de amendoim ou requeijão light  
        - 1 banana ou outra fruta da estação  
        - 1 copo de leite integral ou desnatado (200ml) ou 200ml de água com 1 scoop de whey caseiro (opcional, veja abaixo)  

        **Macronutrientes estimados:**

        - Proteína: ~20g  

        **Custo:** R$4–6 dependendo da região  

        **💡 Dicas para deixar ainda mais barato:**

        - Substitua o leite por **leite em pó reconstituído** (mais barato por litro).  
        - Use ovo como principal fonte de proteína: é completo e barato.  
        - Faça "whey caseiro" com leite em pó + amendoim + aveia batido com água, se não quiser comprar whey industrial.  
      `
    },
    {
      id: 2,
      title: '☕ Café da Tarde Proteico e Barato',
      category: 'nutrition',
      summary: 'Um lanche prático e nutritivo para a tarde!',
      content: `
        **Ingredientes:**

        - 1 omelete com 2 ovos e 1 colher de sopa de aveia  
        - 1 colher de chá de orégano e sal a gosto  
        - 1 copo de vitamina de banana com leite (200ml leite + 1 banana + 1 colher de aveia)  

        **Macronutrientes estimados:**

        - Proteína: ~22g  

        **Custo:** R$5–7  

        **💡 Dicas para deixar ainda mais barato:**

        - Substitua o leite por **leite em pó reconstituído** (mais barato por litro).  
        - Use ovo como principal fonte de proteína: é completo e barato.  
        - Compre aveia em pacotes grandes, rende muito e tem bom custo-benefício.
      `
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tip = this.tips.find(t => t.id === id);
  }

  goBack(): void {
    this.router.navigate(['/tips']);
  }

  getFormattedContent(content: string): string {
    const lines = content.trim().split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('-')) {
        // Trata qualquer linha que comece com "-" como item de lista
        const itemContent = trimmedLine.slice(1).trim(); // Remove o "-"
        const formattedItem = this.formatText(itemContent);

        if (!inList) {
          html += '<ul>'; // Inicia a lista se não estiver em uma
          inList = true;
        }

        html += `<li>${formattedItem}</li>`;
      } else if (trimmedLine.match(/^\*\*[^*]+\*+:/)) {
        // Identifica títulos (ex.: "**Opção 1:**")
        if (inList) {
          html += '</ul>'; // Fecha a lista anterior
          inList = false;
        }
        const titleText = trimmedLine.replace(/\*\*/g, '').replace(':', '').trim();
        html += `<h2>${this.formatText(titleText)}</h2>`;
      } else {
        // Texto comum
        if (inList) {
          html += '</ul>'; // Fecha a lista anterior
          inList = false;
        }
        if (trimmedLine) {
          html += `<p>${this.formatText(trimmedLine)}</p>`;
        }
      }
    }

    // Fecha a lista se ainda estiver aberta
    if (inList) {
      html += '</ul>';
    }

    return html;
  }

  formatText(line: string): string {
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
}