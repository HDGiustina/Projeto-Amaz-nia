<template>
    <v-app>
      <v-container class="w-100 background" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" >
            <v-card class="edit-card" elevation="8">
              <!-- Logo, Nome da Empresa e Botão de Voltar -->
              <div class="d-flex align-center justify-space-between pt-4 pl-4 pr-4">
                <div class="d-flex align-center">
                  <img src="@/assets/logo.png" alt="Logo do Site" height="40">
                  <h1 class="text-h5 font-weight-bold green-darken-2--text ml-2">TreeAnalytics -</h1>

                  <h2 class="text-h5 font-weight-bold text-green-darken-2 ml-2">{{ title }}</h2>
                </div>
                <v-btn icon @click="goBack">
                  <img src="@/assets/icons/voltar.svg" alt="Voltar" height="25">
                </v-btn>
              </div>
  
              <v-card-text>
                <v-tabs v-model="tab" background-color="grey lighten-4">
                  <v-tab v-for="(tabItem, index) in tabItems" :key="index">{{ tabItem }}</v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                  <!-- Edição de Espécie -->
                  <v-tabs-window-item class="mt-5" :key="0">
                    <Loading :loading="loading" />

                    <v-form v-if="!loading" @submit.prevent="handleSubmitEspecie" class="form_especie">
                      <v-text-field
                        v-model="especie.nome_cientifico"
                        :rules="[v => !!v || 'Nome da Espécie é obrigatório']"
                        label="Nome da Espécie"
                        variant="outlined"
                        prepend-inner-icon="mdi-leaf"
                        required
                      ></v-text-field>
                      <v-textarea
                        v-model="especie.descricao"
                        :rules="[v => !!v || 'Descrição da Espécie é obrigatória']"
                        label="Descrição da Espécie"
                        variant="outlined"
                        prepend-inner-icon="mdi-text"
                        required
                      ></v-textarea>
                      <v-file-input
                        v-model="especie.imagem"
                        :rules="[v => !!v || 'Imagem é obrigatória', validateImageSize]"
                        label="Trocar Imagem da Espécie"
                        variant="outlined"
                        prepend-inner-icon="mdi-image"
                        prepend-icon="mdi-camera"
                        accept="image/*"
                        required
                        @change="convertImageToBase64"
                      ></v-file-input>
                      <div v-if="especie.imagemBase64" class="image-preview">
                        <img :src="especie.imagemBase64" alt="Pré-visualização da imagem" />
                      </div>
                      <v-btn type="submit" color="green-darken-2" block class="mt-4">
                        Salvar Espécie
                      </v-btn>
                    </v-form>
                  </v-tabs-window-item>
                  <!-- Taxonomia -->
                  <v-tabs-window-item class="mt-5" :key="1">
                    <Loading :loading="loading" />

                    <v-form v-if="!loading" @submit.prevent="handleSubmitTaxonomia" class="form_taxonomia">
                      <v-text-field v-model="taxonomia.divisao" label="Divisão" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.clado" label="Clado" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.ordem" label="Ordem" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.familia" label="Família" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.subfamilia" label="Subfamília" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.genero" label="Gênero" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.tribo" label="Tribo" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.secao" label="Seção" variant="outlined"></v-text-field>
                      <v-text-field v-model="taxonomia.binomio_especifico" label="Binômio Específico" variant="outlined"></v-text-field>
                      <v-textarea v-model="taxonomia.primeira_publicacao" label="Primeira Publicação" variant="outlined"></v-textarea>
                      <v-textarea v-model="taxonomia.sinonimia_botanica" label="Sinonímia Botânica" variant="outlined"></v-textarea>
                      <v-textarea v-model="taxonomia.nomes_vulgares_uf" label="Nomes Vulgares (UF)" variant="outlined"></v-textarea>
                      <v-textarea v-model="taxonomia.nomes_vulgares_exterior" label="Nomes Vulgares (Exterior)" variant="outlined"></v-textarea>
                      <v-textarea v-model="taxonomia.etimologia" label="Etimologia" variant="outlined"></v-textarea>
                      <v-btn type="submit" color="green-darken-2" block class="mt-4">
                        Salvar Taxonomia
                      </v-btn>
                    </v-form>
                  </v-tabs-window-item>
                  <!-- Descrição Botânica -->
                  <v-tabs-window-item class="mt-5" :key="2">
                    <v-form @submit.prevent="handleSubmitDescricaoBotanica" class="form_descricaoBotanica">
                      <v-textarea v-model="descricaoBotanica.forma_biologica_foliacao" label="Forma Biológica e Foliacão" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.tronco" label="Tronco" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.ramificacao" label="Ramificação" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.casca" label="Casca" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.folhas" label="Folhas" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.inflorescencias" label="Inflorescências" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.flores" label="Flores" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.fruto" label="Fruto" variant="outlined"></v-textarea>
                      <v-textarea v-model="descricaoBotanica.sementes" label="Sementes" variant="outlined"></v-textarea>
                      <v-btn type="submit" color="green-darken-2" block class="mt-4">
                        Salvar Descrição Botânica
                      </v-btn>
                    </v-form>
                  </v-tabs-window-item>
                  <!-- Biologia Reprodutiva -->
                  <v-tabs-window-item class="mt-5" :key="3">
                    <v-form @submit.prevent="handleSubmitBiologiaReprodutiva" class="form_biologiaReprodutiva">
                      <v-text-field v-model="biologiaReprodutiva.sistema_sexual" label="Sistema Sexual" variant="outlined"></v-text-field>
                      <v-text-field v-model="biologiaReprodutiva.vetor_polinizacao" label="Vetor de Polinização" variant="outlined"></v-text-field>
                      <v-textarea v-model="biologiaReprodutiva.floracao" label="Floração" variant="outlined"></v-textarea>
                      <v-textarea v-model="biologiaReprodutiva.frutificacao" label="Frutificação" variant="outlined"></v-textarea>
                      <v-textarea v-model="biologiaReprodutiva.dispersao_frutos_sementes" label="Dispersão de Frutos e Sementes" variant="outlined"></v-textarea>
                      <v-textarea v-model="biologiaReprodutiva.qualidade_sementes" label="Qualidade das Sementes" variant="outlined"></v-textarea>
                      <v-btn type="submit" color="green-darken-2" block class="mt-4">
                        Salvar Biologia Reprodutiva
                      </v-btn>
                    </v-form>
                  </v-tabs-window-item>
                  <!-- Ocorrência Natural -->
                  <v-tabs-window-item class="mt-5" :key="4">
                    <v-form @submit.prevent="handleSubmitOcorrenciaNatural" class="form_ocorrenciaNatural">
                      <v-text-field v-model="ocorrenciaNatural.latitudes" label="Latitudes" variant="outlined"></v-text-field>
                      <v-text-field v-model="ocorrenciaNatural.variacao_altitudinal" label="Variação Altitudinal" variant="outlined"></v-text-field>
                      <v-textarea v-model="ocorrenciaNatural.mapa_imagem" label="Mapa e Imagem" variant="outlined"></v-textarea>
                      <v-btn type="submit" color="green-darken-2" block class="mt-4">
                        Salvar Ocorrência Natural
                      </v-btn>
                    </v-form>
                  </v-tabs-window-item>
                                  <!-- Aspectos Ecológicos -->
                <v-tabs-window-item class="mt-5" :key="5">
                  <v-form @submit.prevent="handleSubmitAspectosEcologicos" class="form_aspectosEcologicos">
                    <v-text-field v-model="aspectosEcologicos.grupo_sucessional" label="Grupo Sucessional" variant="outlined"></v-text-field>
                    <v-textarea v-model="aspectosEcologicos.importancia_sociologica" label="Importância Sociológica" variant="outlined"></v-textarea>
                    <v-textarea v-model="aspectosEcologicos.regeneracao_natural" label="Regeneração Natural" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Aspectos Ecológicos
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Produtos e Utilizações -->
                <v-tabs-window-item class="mt-5" :key="6">
                  <v-form @submit.prevent="handleSubmitProdutosUtilizacoes" class="form_produtosUtilizacoes">
                    <v-textarea v-model="produtosUtilizacoes.aproveitamento_alimentar" label="Aproveitamento Alimentar" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.apicola" label="Apícola" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.celulose_papel" label="Celulose e Papel" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.energia" label="Energia" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.madeira_serrada_rolica" label="Madeira Serrada/Roliça" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.medicinal" label="Medicinal" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.alerta" label="Alerta" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.paisagistico" label="Paisagístico" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.plantios_ambientais" label="Plantios Ambientais" variant="outlined"></v-textarea>
                    <v-textarea v-model="produtosUtilizacoes.substancias_tanantes" label="Substâncias Tanantes" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Produtos e Utilizações
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Composição Biotecnológica -->
                <v-tabs-window-item class="mt-5" :key="7">
                  <v-form @submit.prevent="handleSubmitComposicaoBiotecnologica" class="form_composicaoBiotecnologica">
                    <v-text-field v-model="composicaoBiotecnologica.variacao_carboidratos" label="Variação de Carboidratos" type="number" variant="outlined"></v-text-field>
                    <v-text-field v-model="composicaoBiotecnologica.variacao_proteinas" label="Variação de Proteínas" type="number" variant="outlined"></v-text-field>
                    <v-textarea v-model="composicaoBiotecnologica.grupo_substancias" label="Grupo de Substâncias" variant="outlined"></v-textarea>
                    <v-textarea v-model="composicaoBiotecnologica.levantamento_bibliografico" label="Levantamento Bibliográfico" variant="outlined"></v-textarea>
                    <v-textarea v-model="composicaoBiotecnologica.biofertilizante" label="Biofertilizante" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Composição Biotecnológica
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Cultivo em Viveiros -->
                <v-tabs-window-item class="mt-5" :key="8">
                  <v-form @submit.prevent="handleSubmitCultivoViveiros" class="form_cultivoViveiros">
                    <v-textarea v-model="cultivoViveiros.implantacao_viveiros" label="Implantação de Viveiros" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.caracteristicas_silviculturais" label="Características Silviculturais" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.habito" label="Hábito" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.sistemas_plantio" label="Sistemas de Plantio" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.sistemas_agroflorestais" label="Sistemas Agroflorestais" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.crescimento_producao" label="Crescimento e Produção" variant="outlined"></v-textarea>
                    <v-text-field v-model="cultivoViveiros.numero_sementes_por_kg" label="Número de Sementes por Kg" variant="outlined"></v-text-field>
                    <v-textarea v-model="cultivoViveiros.tratamento_pre_germinativo" label="Tratamento Pré-germinativo" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.longevidade_armazenamento" label="Longevidade e Armazenamento" variant="outlined"></v-textarea>
                    <v-textarea v-model="cultivoViveiros.germinacao_laboratorio" label="Germinação em Laboratório" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Cultivo em Viveiros
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Produção de Mudas -->
                <v-tabs-window-item class="mt-5" :key="9">
                  <v-form @submit.prevent="handleSubmitProducaoMudas" class="form_producaoMudas">
                    <v-textarea v-model="producaoMudas.semeadura" label="Semeadura" variant="outlined"></v-textarea>
                    <v-textarea v-model="producaoMudas.germinacao" label="Germinação" variant="outlined"></v-textarea>
                    <v-textarea v-model="producaoMudas.associacao_simbiotica" label="Associação Simbiótica" variant="outlined"></v-textarea>
                    <v-textarea v-model="producaoMudas.cuidados_especiais" label="Cuidados Especiais" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Produção de Mudas
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Pragas -->
                <v-tabs-window-item class="mt-5" :key="10">
                  <v-form @submit.prevent="handleSubmitPragas" class="form_pragas">
                    <v-textarea v-model="pragas.descricao" label="Descrição" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Pragas
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Solos -->
                <v-tabs-window-item class="mt-5" :key="11">
                  <v-form @submit.prevent="handleSubmitSolos" class="form_solos">
                    <v-textarea v-model="solos.descricao" label="Descrição" variant="outlined"></v-textarea>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Solos
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
                <!-- Anexos -->
                <v-tabs-window-item class="mt-5" :key="12">
                  <v-form @submit.prevent="handleSubmitAnexos" class="form_anexos">
                    <v-file-input
                      v-model="anexos.imagem"
                      :rules="[v => !!v || 'Imagem é obrigatória', validateImageSize]"
                      label="Imagem"
                      variant="outlined"
                      prepend-inner-icon="mdi-image"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      required
                      @change="convertAnexoToBase64"
                    ></v-file-input>
                    <v-text-field v-model="anexos.legenda" label="Legenda" variant="outlined"></v-text-field>
                    <v-btn type="submit" color="green-darken-2" block class="mt-4">
                      Salvar Anexo
                    </v-btn>
                  </v-form>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-footer app>
      <v-spacer></v-spacer>
      <div>
        Nome: {{ user.nome }} | Email: {{ user.email }}
      </div>
      <button class="button_loggout" @click="loggout()">Sair</button>
    </v-footer>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store';
import endpoints from '@/controllers/Endpoints.controller';
import router from '@/router';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

// Estados iniciais
const tab = ref(0)
const tabItems = [
  'Edição de Espécie', 
  'Taxonomia', 
  'Descrição Botânica', 
  'Biologia Reprodutiva', 
  'Ocorrência Natural', 
  'Aspectos Ecológicos', 
  'Produtos e Utilizações', 
  'Composição Biotecnológica', 
  'Cultivo em Viveiros', 
  'Produção de Mudas', 
  'Pragas', 
  'Solos', 
  'Anexos'
]

// Dados do usuário
const userStore = useUserStore()
let user = ref(false)
setTimeout(async () => {
  user.value = await userStore.getUserData()
}, 100)

// Dados das espécies e formulários
const especie = ref({
  nome_cientifico: '',
  descricao: '',
  imagem: null,
  imagemBase64: ''
})
const taxonomia = ref({})
const descricaoBotanica = ref({})
const biologiaReprodutiva = ref({})
const ocorrenciaNatural = ref({})
const aspectosEcologicos = ref({})
const produtosUtilizacoes = ref({})
const composicaoBiotecnologica = ref({})
const cultivoViveiros = ref({})
const producaoMudas = ref({})
const pragas = ref({})
const solos = ref({})
const anexos = ref({
  imagem: null,
  imagemBase64: '',
  legenda: ''
})
const route = useRoute();
const id = route.params.id; 
const title = ref()
const loading = ref(false); 

const atualizaEspecie = async () => {
    loading.value = true; 
    especie.value = await endpoints.getOneEspecie(id);
    if (especie.value.imagem) {
        especie.value.imagemBase64 = especie.value.imagem;
    }
    especie.value.imagem = null
    title.value = especie.value.nome_cientifico;

    setTimeout(() => {
      loading.value = false; 
    }, 1000);
}

const atualizaTaxonomia = async () => {
    loading.value = true; 
    let res = await endpoints.getTaxonomia(id);
    if(res){
      taxonomia.value = res
    }
    setTimeout(() => {
      loading.value = false; 
    }, 1000);
}

setTimeout(async () => {
    atualizaEspecie()
    atualizaTaxonomia()
}, 100)

// Funções de validação
const validateImageSize = (v) => {
  if (!v[0]) return 'Imagem é obrigatória'
  if (v[0].size > 2000000) return `A imagem deve ser menor que 2MB`
  return true
}

// Funções de conversão de imagem para Base64
const convertImageToBase64 = (event) => {
  const file = event.target.files[0]
  if (file && file.size < 2000000) {
    const reader = new FileReader()
    reader.onloadend = () => {
      especie.value.imagemBase64 = reader.result
    }
    reader.readAsDataURL(file)
  } else {
    especie.value.imagemBase64 = ''
  }
}

const convertAnexoToBase64 = (event) => {
  const file = event.target.files[0]
  if (file && file.size < 2000000) {
    const reader = new FileReader()
    reader.onloadend = () => {
      anexos.value.imagemBase64 = reader.result
    }
    reader.readAsDataURL(file)
  } else {
    anexos.value.imagemBase64 = ''
  }
}

// Funções de submissão dos formulários
const handleSubmitEspecie = async () => {
  if (especie.value.nome_cientifico && especie.value.descricao && especie.value.imagemBase64) {
    try {
      let res = await endpoints.editOneEspecie(id, {
        nome_cientifico: especie.value.nome_cientifico,
        descricao: especie.value.descricao,
        imagem: especie.value.imagemBase64
      })
      if (res) {
        atualizaEspecie()
        snackbar.value.text = 'Espécie editada com sucesso!';
        snackbar.value.color = 'success';
        snackbar.value.show = true;
      }
    } catch (error) {
      snackbar.value.text = 'Erro ao editar espécie';
      snackbar.value.color = 'error';
      snackbar.value.show = true;
      console.error("Erro ao cadastrar espécie:", error)
    }
  } else {
    snackbar.value.text = 'Complete todos os campos corretamente!';
    snackbar.value.color = 'warning';
    snackbar.value.show = true;
    console.error("Todos os campos são obrigatórios.")
  }
}

const handleSubmitTaxonomia = async () => {
  loading.value = true; 
  try {
    let res = false
    if(taxonomia.value.id){
      res = await endpoints.cadastrarTaxonomias(taxonomia.value, id, true)

    } else {
      res = await endpoints.cadastrarTaxonomias({...taxonomia.value, especie_id: id})
    }
    if (res) {
      snackbar.value.text = 'Taxonomia editada com sucesso!';
      snackbar.value.color = 'success';
      snackbar.value.show = true;
      atualizaTaxonomia()
    }
  } catch (error) {
    snackbar.value.text = 'Erro ao editar taxonomia';
    snackbar.value.color = 'error';
    snackbar.value.show = true;
    console.error("Erro ao cadastrar taxonomia:", error)
  }
  setTimeout(() => {
    loading.value = false; 
  }, 1000);
}

// Adicione as demais funções de submissão de forma similar
const handleSubmitDescricaoBotanica = async () => { /* ... */ }
const handleSubmitBiologiaReprodutiva = async () => { /* ... */ }
const handleSubmitOcorrenciaNatural = async () => { /* ... */ }
const handleSubmitAspectosEcologicos = async () => { /* ... */ }
const handleSubmitProdutosUtilizacoes = async () => { /* ... */ }
const handleSubmitComposicaoBiotecnologica = async () => { /* ... */ }
const handleSubmitCultivoViveiros = async () => { /* ... */ }
const handleSubmitProducaoMudas = async () => { /* ... */ }
const handleSubmitPragas = async () => { /* ... */ }
const handleSubmitSolos = async () => { /* ... */ }
const handleSubmitAnexos = async () => {
  if (anexos.value.imagemBase64 && anexos.value.legenda) {
    try {
      let res = await endpoints.cadastrarAnexos(anexos.value)
      if (res) {
        snackbar.value.text = 'Anexo cadastrado com sucesso!';
        snackbar.value.color = 'success';
        snackbar.value.show = true;
      }
    } catch (error) {
      snackbar.value.text = 'Erro ao cadastrar anexo';
      snackbar.value.color = 'error';
      snackbar.value.show = true;
      console.error("Erro ao cadastrar anexo:", error)
    }
  } else {
    snackbar.value.text = 'Imagem e legenda são obrigatórias!';
    snackbar.value.color = 'warning';
    snackbar.value.show = true;
    console.error("Todos os campos são obrigatórios.")
  }
}

const goBack = () => {
  // Redireciona para a página anterior
  router.back()
}

const loggout = () => {
  userStore.logout()
  router.push('/login')
}

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});
</script>

<style scoped>
.background {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, var(--tertiary-color) 100%);
}

.edit-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 24px;
  margin: 0 0 50px;
}
.button_loggout {
  background: var(--tertiary-color);
  margin: 0px 10px 0;
  padding: 5px 15px;
  border-radius: 15px !important;
  transition: all 0.3s;
}
.button_loggout:hover {
  filter: brightness(0.8);
}

.form_especie .v-text-field, .form_taxonomia .v-text-field, .form_descricaoBotanica .v-text-field {
  margin: 0 0 15px;
}

.image-preview {
  margin-top: 10px;
  text-align: center;
}
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  border-radius: 8px;
}
</style>
