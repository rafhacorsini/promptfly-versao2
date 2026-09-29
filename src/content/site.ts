/**
 * Dados reais que aparecem na home. Deixe `null` o que ainda não tiver
 * número de verdade: o item simplesmente não aparece no site.
 */
export const site = {
  instagram: {
    handle: "@rafha.gpt",
    url: "https://www.instagram.com/rafha.gpt/",
  },

  stats: {
    /** Ex: "12 mil" */
    followers: null as string | null,
    biggestReelViews: "118 mil" as string | null,
    /** Ex: "240" */
    vipMembers: null as string | null,
  },

  premium: {
    /** Ex: "R$ 127". Com null, a home mostra só "Pagamento único". */
    price: null as string | null,
  },

  about: {
    /** Caminho em /public, ex: "/rafha.jpg". Com null, mostra a inicial. */
    photo: null as string | null,
  },
};
