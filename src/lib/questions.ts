export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctId: string;
}

export const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Çeşitli türden medya mesajlarına erişebilme, bunları eleştirel bir bakış açısıyla analiz edip değerlendirebilme ve kendi iletilerini üretebilme becerisine ne ad verilir?",
    options: [
      { id: "a", text: "İnfodemi" },
      { id: "b", text: "Doğrulama" },
      { id: "c", text: "Medya Okuryazarlığı" },
      { id: "d", text: "Dijital Ayak İzi" },
    ],
    correctId: "c",
  },
  {
    id: 2,
    text: "Bir bireyin veya grubun düşüncelerini, duygularını ve davranışlarını bilinçli olarak yönlendirmek ya da değiştirmek amacıyla yanıltıcı veya çarpıtılmış bilgi kullanma eylemi nedir?",
    options: [
      { id: "a", text: "Manipülasyon" },
      { id: "b", text: "İnfodemi" },
      { id: "c", text: "Propaganda" },
      { id: "d", text: "Algoritma" },
    ],
    correctId: "a",
  },
  {
    id: 3,
    text: "Bireylere, topluma veya devletlere zarar vermek amacıyla 'kasıtlı' olarak üretilen ve yayılan eksik, yanlış veya çarpıtılmış bilgiye ne denir?",
    options: [
      { id: "a", text: "Mezenformasyon" },
      { id: "b", text: "Dezenformasyon" },
      { id: "c", text: "Malenformasyon" },
      { id: "d", text: "Sahte Haber" },
    ],
    correctId: "b",
  },
  {
    id: 4,
    text: "Yanlış veya eksik bilginin, doğru olduğuna inanarak 'kasıtsız' bir şekilde paylaşılması durumu aşağıdakilerden hangisidir?",
    options: [
      { id: "a", text: "Dezenformasyon" },
      { id: "b", text: "Suni Gündem" },
      { id: "c", text: "Propaganda" },
      { id: "d", text: "Mezenformasyon" },
    ],
    correctId: "d",
  },
  {
    id: 5,
    text: "Gerçeğe dayalı bilgilerin, bir kişiye, topluluğa veya kuruma zarar verme kastıyla kamusal alana taşınmasına ne denir?",
    options: [
      { id: "a", text: "Malenformasyon" },
      { id: "b", text: "Siber Zorbalık" },
      { id: "c", text: "Filtre Balonu" },
      { id: "d", text: "Yemleme" },
    ],
    correctId: "a",
  },
  {
    id: 6,
    text: "Bireylerin bir konu hakkında karar verirken nesnel gerçekler ve ortak deliller yerine, kendi önyargılarına, kişisel duygularına ve inançlarına öncelik verdiği toplumsal durumu tanımlayan kavram hangisidir?",
    options: [
      { id: "a", text: "Algoritma" },
      { id: "b", text: "Manipülasyon" },
      { id: "c", text: "Post-Truth (Hakikat Sonrası)" },
      { id: "d", text: "İnfodemi" },
    ],
    correctId: "c",
  },
  {
    id: 7,
    text: "Doğru ve yanlış bilgilerin birbirine karıştığı, kontrolsüz ve yoğun bilgi akışını tanımlayan 'bilgi salgını' terimi nedir?",
    options: [
      { id: "a", text: "Propaganda" },
      { id: "b", text: "Suni Gündem" },
      { id: "c", text: "Trol" },
      { id: "d", text: "İnfodemi" },
    ],
    correctId: "d",
  },
  {
    id: 8,
    text: "Sosyal medya yazılımlarının kullanıcıya sadece kendisinin ilgisini çekecek içerikleri sunarak, farklı fikirleri görmesini engellemesine ne denir?",
    options: [
      { id: "a", text: "Kamu Spotu" },
      { id: "b", text: "Filtre Balonu" },
      { id: "c", text: "Dijital Ayak İzi" },
      { id: "d", text: "Yankı Odası Etkisi" },
    ],
    correctId: "b",
  },
  {
    id: 9,
    text: "Bilgilerin ya da fikirlerin çıkarı olan bir taraf tarafından sistematik olarak kendi lehine bir kanaat oluşturmak amacıyla yayılmasına ne ad verilir?",
    options: [
      { id: "a", text: "Sahte Haber" },
      { id: "b", text: "Propaganda" },
      { id: "c", text: "Doğrulama" },
      { id: "d", text: "Yemleme" },
    ],
    correctId: "b",
  },
  {
    id: 10,
    text: "Ana akım haberleri taklit eden, kasıtlı olarak geliştirilmiş, sansasyonel veya tamamen uydurma içeriklere ne denir?",
    options: [
      { id: "a", text: "İnfodemi" },
      { id: "b", text: "Algoritma" },
      { id: "c", text: "Sahte Haber" },
      { id: "d", text: "Post-Truth (Hakikat Sonrası)" },
    ],
    correctId: "c",
  },
  {
    id: 11,
    text: "Sosyal medya platformlarında bireyin karşıt fikirleri bilinçli olarak yok sayıp sadece kendi görüşünü destekleyen fikirleri paylaştığı tek taraflı iletişim ortamlarına ne ad verilir?",
    options: [
      { id: "a", text: "Yankı Odası" },
      { id: "b", text: "Filtre Balonu" },
      { id: "c", text: "Siber Zorbalık" },
      { id: "d", text: "Propaganda" },
    ],
    correctId: "a",
  },
  {
    id: 12,
    text: "İnternette veya sosyal medyada yayılan şüpheli görsel ve bilgilerin güvenilir kaynaklarla test edilerek gerçekliğini belirleme sürecine ne denir?",
    options: [
      { id: "a", text: "Yemleme" },
      { id: "b", text: "Trol" },
      { id: "c", text: "Algoritma" },
      { id: "d", text: "Doğrulama" },
    ],
    correctId: "d",
  },
  {
    id: 13,
    text: "Bireylerin internet üzerinde bıraktığı, dijital ortamda yapılan her türlü etkinlikten kaynaklanan, bilinçli veya bilinçsiz bırakılan verilere ne ad verilir?",
    options: [
      { id: "a", text: "Kamu Spotu" },
      { id: "b", text: "Algoritma" },
      { id: "c", text: "Dijital Ayak İzi" },
      { id: "d", text: "Akıllı İşaretler" },
    ],
    correctId: "c",
  },
  {
    id: 14,
    text: "Dijital teknolojiler aracılığıyla bir bireyi veya grubu kasıtlı ve sürekli olarak korkutmayı, öfkelendirmeyi ya da utandırmayı amaçlayan saldırgan davranışlara ne denir?",
    options: [
      { id: "a", text: "Siber Zorbalık" },
      { id: "b", text: "Trol" },
      { id: "c", text: "Malenformasyon" },
      { id: "d", text: "Manipülasyon" },
    ],
    correctId: "a",
  },
  {
    id: 15,
    text: "Belirli bir girdiyi alıp belirli bir çıktıya dönüştüren, bir problemi çözmek veya bir görevin tamamlanması için belirlenmiş sıralı adımlar bütününe ne denir?",
    options: [
      { id: "a", text: "Yankı Odası Etkisi" },
      { id: "b", text: "Doğrulama" },
      { id: "c", text: "Filtre Balonu" },
      { id: "d", text: "Algoritma" },
    ],
    correctId: "d",
  },
  {
    id: 16,
    text: "Özünde kamuoyunun gerçekten konuştuğu konuları yansıtmayan, bir kişinin veya grubun kamuoyunca konuşulmasını istediği spesifik bir meseleyi belirli medya araçları kullanarak dolaşıma sokmasıyla oluşan gündem sürecine ne ad verilir?",
    options: [
      { id: "a", text: "Sahte Haber" },
      { id: "b", text: "Suni Gündem" },
      { id: "c", text: "Yemleme" },
      { id: "d", text: "Propaganda" },
    ],
    correctId: "b",
  },
  {
    id: 17,
    text: "İnsanları kışkırtmak veya tartışmaları provoke etmek amacıyla kasıtlı olarak rahatsız edici ya da yanıltıcı mesajlar gönderen anonim kullanıcılara ne denir?",
    options: [
      { id: "a", text: "Siber Zorbalık" },
      { id: "b", text: "Doğrulama" },
      { id: "c", text: "Yemleme" },
      { id: "d", text: "Trol" },
    ],
    correctId: "d",
  },
  {
    id: 18,
    text: "İnternet ortamında kullanıcıların ilgisini çekmek için yanıltıcı veya cazip başlıklar (tık tuzağı) kullanılarak içeriğin tıklanmasını sağlama eylemine ne denir?",
    options: [
      { id: "a", text: "İnfodemi" },
      { id: "b", text: "Yemleme" },
      { id: "c", text: "Malenformasyon" },
      { id: "d", text: "Suni Gündem Oluşturma" },
    ],
    correctId: "b",
  },
  {
    id: 19,
    text: "Toplumu ilgilendiren konularda (iklim, sağlık vb.) bilgilendirme yapmak amacıyla hazırlanan televizyon/radyo reklamlarına ne denir?",
    options: [
      { id: "a", text: "Kamu Spotu" },
      { id: "b", text: "Akıllı İşaretler" },
      { id: "c", text: "Propaganda" },
      { id: "d", text: "Medya Okuryazarlığı" },
    ],
    correctId: "a",
  },
  {
    id: 20,
    text: "Televizyon yayınlarının olası zararlı etkilerinden toplumu korumak için kullanılan yayınların içeriğiyle ilgili bilgilendirici sınıflandırma sistemine ne denir?",
    options: [
      { id: "a", text: "Filtre Balonu" },
      { id: "b", text: "Kamu Spotu" },
      { id: "c", text: "Akıllı İşaretler" },
      { id: "d", text: "Doğrulama" },
    ],
    correctId: "c",
  },
];

export function getRandomQuestions(count = 10): Question[] {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  const labels = ["a", "b", "c", "d"] as const;
  return shuffled.slice(0, count).map((q) => {
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    // Re-label by position so A is always first, B second, etc.
    const relabeled = shuffledOptions.map((opt, i) => ({ ...opt, id: labels[i] }));
    const newCorrectId = labels[shuffledOptions.findIndex((opt) => opt.id === q.correctId)];
    return { ...q, options: relabeled, correctId: newCorrectId };
  });
}
