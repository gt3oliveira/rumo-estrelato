import { GetServerSideProps } from 'next';
import React, { FormEvent, useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { FaArrowLeft } from 'react-icons/fa6'
import FormatarData from '@/logic/FormatarData';

import { db, storage } from '@/services/firebaseConnection';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { Accordion, AccordionItem, Input } from '@nextui-org/react'
import { Select, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

import imgConfig from '../../../public/assets/images/configuracoes.png'
import Image from 'next/image';

type CampeonatosProps = {
  id: string;
  name: string;
  logo: string;
}

type ClubesProps = {
  id: string;
  name: string;
  escudo: string;
  camisa: string;
}

type TrofeuProps = {
  id: string;
  name: string;
  imgTrofeu: string;
}

type TrofeuIndividualProps = {
  id: string;
  name: string;
}

interface ConfiguracoesProps {
  campeonatosProps: CampeonatosProps[],
  clubesProps: ClubesProps[],
  trofeuProps: TrofeuProps[],
  trofeuIndividualProps: TrofeuIndividualProps[],
}

export default function Configuracoes({ campeonatosProps, trofeuProps, clubesProps, trofeuIndividualProps }: ConfiguracoesProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter()
  const defaultTitle = "border-b-1 border-white";
  const [opcao, setOpcao] = useState(0)
  const [URLPlayerCapa, setURLPlayerCapa] = useState('')
  const [URLPlayerTime, setURLPlayerTime] = useState('')

  useEffect(() => {
    if (URLPlayerCapa !== '') {
      handleSaveURLPlayerCapa(URLPlayerCapa)
    }
    if (URLPlayerTime !== '') {
      handleSaveURLPlayerTime(URLPlayerTime)
    }
  }, [URLPlayerCapa, URLPlayerTime])

  // == REGISTRAR TITULO == == REGISTRAR TITULO == == REGISTRAR TITULO == == REGISTRAR TITULO == == REGISTRAR TITULO ==
  const [idCup, setIdCup] = useState('');
  const [selectTitulo, setSelectTitulo] = useState<TrofeuProps[]>(trofeuProps || [])
  const [selectTime, setSelectTime] = useState<ClubesProps[]>(clubesProps || [])
  const [idTime, setIdTime] = useState(''); const [anoTitulo, setAnoTitulo] = useState(''); const [artilheiro, setArtilheiro] = useState(''); const [assistencia, setAssistencia] = useState('')
  const [imgTrofeu, setImgTrofeu] = useState(''); const [nameTrofeu, setNameTrofeu] = useState('')

  // == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME ==
  const [name, setName] = useState(''); const [escudo, setEscudo] = useState(''); const [camisa, setCamisa] = useState('')

  // == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS ==
  const [selectIndividuais, setSelectIndividuais] = useState<TrofeuIndividualProps[]>(trofeuIndividualProps || [])
  const [idTituloIndividual, setIdTituloIndividual] = useState('')

  function handleUpload(event: any) {
    event.preventDefault()
    let caminhoStorage = ''

    const file = event.target[0]?.files[0]
    if (!file) return;

    if (opcao === 4) caminhoStorage = `playerCapa/${file.name}`;
    if (opcao === 5) caminhoStorage = `playerTime/${file.name}`;

    const storageRef = ref(storage, caminhoStorage)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          if(opcao === 4) setURLPlayerCapa(url);
          if(opcao === 5) setURLPlayerTime(url);
        })
      }
    )
  }

  async function handleSaveURLPlayerCapa(imgURL: string) {
    await addDoc(collection(db, 'playerCapa'), {
      imgPlayer: imgURL,
      created: FormatarData()
    })

    router.push('/Dashboard')
  }

  async function handleSaveURLPlayerTime(imgURL: string) {
    await addDoc(collection(db, 'playerTime'), {
      imgPlayer: imgURL,
      idCup: idCup
    })

    router.push('/Dashboard')
  }

  return (
    <>
      <header>
        <title>⚙ Configurações</title>
      </header>

      <Header imgSrc={imgConfig as any} imgAlt='Configurações' title='Configurações do sistema' width={400} height={100} />

      <Link href={'/Dashboard'} className='absolute top-3 left-3 text-white'>
        <FaArrowLeft size={28} />
      </Link>

      <div className='h-[15vh] bg-gradient-to-t from-[#111] to-[#000]' />

      <main className='flex flex-col w-full px-2 pt-4 overflow-scroll h-[65vh] bg-gradient-to-t from-[#696969] to-[#111]'>
        <Accordion>
          {/* == REGISTRAR TITULO == == REGISTRAR TITULO == == REGISTRAR TITULO == == REGISTRAR TITULO == */}
          <AccordionItem className={defaultTitle} key="1" aria-label="Accordion 1"
            title={<p className='text-white text-2xl'>🏆 Registrar Título</p>}
          >
            <form onSubmit={handleSaveTitulo}>
              {/* == SELECT DO CAMPEONATO == == SELECT DO CAMPEONATO == == SELECT DO CAMPEONATO == == SELECT DO CAMPEONATO == */}
              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o campeonato</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
                onChange={(e) => setIdCup(e.target.value)}
              >
                {campeonatosProps.map((cup) => (
                  <SelectItem key={cup.id} value={cup.id} textValue={cup.name} variant='bordered' className='bg-gray-500 text-white p-2' onClick={() => buscarTrofeus(cup.id)}>
                    <span className='flex flex-row gap-2 text-lg'>
                      <Image
                        src={cup.logo}
                        alt={cup.name}
                        width={30}
                        height={30}
                        quality={100}
                      />
                      {cup.name}
                    </span>
                  </SelectItem>
                ))}
              </Select>

              {/* == SELECT DO TÍTULO == == SELECT DO TÍTULO == == SELECT DO TÍTULO == == SELECT DO TÍTULO == == SELECT DO TÍTULO == */}
              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o título</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
              >
                {selectTitulo.map((item) => (
                  <SelectItem key={item.id} value={item.id} textValue={item.name} variant='bordered' className='bg-gray-500 text-white p-2' onClick={() => (buscarTimes(), setNameTrofeu(item.name), setImgTrofeu(item.imgTrofeu))}>
                    <span className='text-lg'>{item.name}</span>
                  </SelectItem>
                ))}
              </Select>

              {/* == SELECT DO TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == == SELECT TIME == */}
              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o time</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
                onChange={(e) => setIdTime(e.target.value)}
              >
                {selectTime.map((item) => (
                  <SelectItem key={item.id} value={item.id} textValue={item.name} variant='bordered' className='bg-gray-500 text-white p-2' onClick={() => (setName(item.name), setEscudo(item.escudo), setCamisa(item.camisa))}>
                    <span className='flex flex-row gap-2 text-lg'>
                      <Image
                        src={item.escudo}
                        alt={item.name}
                        width={30}
                        height={30}
                        quality={100}
                      />
                      {item.name}
                    </span>
                  </SelectItem>
                ))}
              </Select>

              <Input value={anoTitulo} onChange={(e) => setAnoTitulo(e.target.value)} type='text' size='lg' variant='flat' label={<p className='text-[#7a7a7a]'>Ano do título</p>} className='mb-4' style={{ color: '#000', fontSize: 18 }} />

              <div className='flex flex-row justify-around mb-4 w-full border-1 border-white py-4 rounded-2xl'>
                <Checkbox size='lg' color='success' onChange={(e) => setArtilheiro(e.target.value)} value='⚽'>
                  <span className='text-white text-lg'>⚽ Artilheiro</span>
                </Checkbox>
                <Checkbox size='lg' color='success' onChange={(e) => setAssistencia(e.target.value)} value="🥅">
                  <span className='text-white text-lg'>🥅 Assistência</span>
                </Checkbox>
              </div>


              <Button type='submit' size='lg' className=' w-full text-2xl text-white font-medium bg-green-500 mb-4'>Salvar</Button>
            </form>
          </AccordionItem>

          {/* == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME == == REGISTRAR TIME == */}
          <AccordionItem className={defaultTitle} key="2" aria-label="Accordion 2"
            title={<p className='text-white text-2xl'>👕 Registrar Time</p>}
          >
            <form onSubmit={handleSaveTime}>
              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o campeonato</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
                onChange={(e) => setIdCup(e.target.value)}
              >
                {campeonatosProps.map((cup) => (
                  <SelectItem key={cup.id} value={cup.id} textValue={cup.name} variant='bordered' className='bg-gray-500 text-white p-2'>
                    <span className='flex flex-row gap-2 text-lg'>
                      <Image
                        src={cup.logo}
                        alt={cup.name}
                        width={30}
                        height={30}
                        quality={100}
                      />
                      {cup.name}
                    </span>
                  </SelectItem>
                ))}
              </Select>

              <Input value={name} onChange={(e) => setName(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Nome do clube</p>} variant='flat' className='mb-4' style={{ fontSize: 18, color: '#000' }} />
              <Input value={escudo} onChange={(e) => setEscudo(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Escudo do clube</p>} variant='flat' className='mb-4' style={{ fontSize: 18, color: '#000' }} />
              <Input value={camisa} onChange={(e) => setCamisa(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Número da camisa</p>} type='number' variant='flat' className='mb-4' style={{ fontSize: 18, color: '#000' }} />

              <Button type='submit' size='lg' className=' w-full text-2xl text-white font-medium bg-green-500 mb-4'>Salvar</Button>
            </form>
          </AccordionItem>

          {/* == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == == REGISTRAR TITULOS INDIVIDUAIS == */}
          <AccordionItem className={defaultTitle} key="3" aria-label="Accordion 3" onClick={() => buscarTimes()}
            title={<div className='flex flex-row gap-2 text-white'><p className='text-2xl'>🏅</p><p className='text-xl'>Registrar Títulos Individuais</p></div>}
          >
            <form onSubmit={handleSaveIndividuais}>
              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o time</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
                onChange={(e) => setName(e.target.value)}
              >
                {selectTime.map((item) => (
                  <SelectItem key={item.name} value={item.id} textValue={item.name} variant='bordered' className='bg-gray-500 text-white p-2' onClick={() => (buscarTrofeusIndividuais(), setEscudo(item.escudo), setCamisa(item.camisa))}>
                    <span className='flex flex-row gap-2 text-lg'>
                      <Image
                        src={item.escudo}
                        alt={item.name}
                        width={30}
                        height={30}
                        quality={100}
                      />
                      {item.name}
                    </span>
                  </SelectItem>
                ))}
              </Select>

              <Select
                label={<p className='text-[#7a7a7a]'>Selecione o título</p>}
                size='lg'
                variant='flat'
                style={{ color: '#000' }}
                className='mb-4'
                onChange={(e) => setIdTituloIndividual(e.target.value)}
              >
                {selectIndividuais.map((item) => (
                  <SelectItem key={item.id} value={item.id} textValue={item.name} variant='bordered' className='bg-gray-500 text-white p-2'>
                    <span className='text-lg'>
                      {item.name}
                    </span>
                  </SelectItem>
                ))}
              </Select>

              <Input value={anoTitulo} onChange={(e) => setAnoTitulo(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Ano do título</p>} variant='flat' className='mb-4' style={{ fontSize: 18, color: '#000' }} />

              <Button type='submit' size='lg' className=' w-full text-2xl text-white font-medium bg-green-500 mb-4'>Salvar</Button>
            </form>
          </AccordionItem>

          {/* == SALVAR IMAGEM STORAGE == == SALVAR IMAGEM STORAGE == == SALVAR IMAGEM STORAGE == */}
          <AccordionItem className={defaultTitle} key="4" aria-label="Accordion 4"
            title={<div className='flex flex-row gap-2 text-white'><p className='text-2xl'>📸 </p><p className='text-xl'>Upload de Player Capa</p></div>}
          >
            <form onSubmit={handleUpload}>
              <input type="file" className='bg-gray-500 mb-4 p-2 text-white font-semibold rounded-xl w-[90vw]' />
              <Button type='submit' onClick={() => setOpcao(4)} size='lg' className=' w-full text-2xl text-white font-medium bg-green-500 mb-4'>Salvar</Button>
            </form>
          </AccordionItem>

          {/* == SALVAR IMAGEM STORAGE == == SALVAR IMAGEM STORAGE == == SALVAR IMAGEM STORAGE == */}
          <AccordionItem key="5" aria-label="Accordion 5"
            title={<div className='flex flex-row gap-2 text-white'><p className='text-2xl'>📸 </p><p className='text-xl'>Upload de Player Time</p></div>}
          >
            <Select
              label={<p className='text-[#7a7a7a]'>Selecione o campeonato</p>}
              size='lg'
              variant='flat'
              style={{ color: '#000' }}
              className='mb-4'
              onChange={(e) => setIdCup(e.target.value)}
            >
              {campeonatosProps.map((cup) => (
                <SelectItem key={cup.id} value={cup.id} textValue={cup.name} variant='bordered' className='bg-gray-500 text-white p-2'>
                  <span className='flex flex-row gap-2 text-lg'>
                    <Image
                      src={cup.logo}
                      alt={cup.name}
                      width={30}
                      height={30}
                      quality={100}
                    />
                    {cup.name}
                  </span>
                </SelectItem>
              ))}
            </Select>

            <form onSubmit={handleUpload}>
              <input type="file" className='bg-gray-500 mb-4 p-2 text-white font-semibold rounded-xl w-[90vw]' />
              <Button type='submit' onClick={() => setOpcao(5)} size='lg' className=' w-full text-2xl text-white font-medium bg-green-500 mb-4'>Salvar</Button>
            </form>
          </AccordionItem>
        </Accordion>

        <button onClick={onOpen} className='bg-gray-500 w-[80vw] rounded-lg shadow-md shadow-black active:translate-y-1 active:shadow-none py-2 mb-8 mt-16 m-auto text-xl text-white text-center font-medium'>Apagar o Rumo ao Estrelato</button>
      </main>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' className='mx-2'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">Deletar dados...</ModalHeader>
              <ModalBody>
                <p className='text-xl'>
                  Você deseja deletar os dados do Rumo ao Estrelato deste jogador?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className='text-xl' color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button className='text-xl text-white' color="success" onPress={onClose}>
                  Apagar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  )

  async function buscarTrofeus(idCup: string) {
    const titulosRef = query(collection(db, 'trofeus'), orderBy("name", 'asc'), where('idCup', '==', idCup))
    const snapshotCups = await getDocs(titulosRef)

    let titulos: TrofeuProps[] = []
    snapshotCups.forEach(doc => {
      titulos.push({
        id: doc.id,
        name: doc.data().name,
        imgTrofeu: doc.data().imgTrofeu
      })
    })

    setSelectTitulo(titulos)
  }

  async function buscarTimes() {
    const timesRef = query(collection(db, 'times'), orderBy("name", 'asc'))
    const snapshotTimes = await getDocs(timesRef)

    let times: ClubesProps[] = []
    snapshotTimes.forEach(doc => {
      times.push({
        id: doc.id,
        name: doc.data().name,
        escudo: doc.data().escudo,
        camisa: doc.data().camisa
      })
    })

    setSelectTime(times)
  }

  async function buscarTrofeusIndividuais() {
    const individuaisRef = query(collection(db, 'trofeusIndividuais'), orderBy("name", 'asc'))
    const snapshotIndividuais = await getDocs(individuaisRef)

    let individuais: TrofeuIndividualProps[] = []
    snapshotIndividuais.forEach(doc => {
      individuais.push({
        id: doc.id,
        name: doc.data().name
      })
    })

    setSelectIndividuais(individuais)
  }

  function defaultUseStates() {
    setIdTime(''); setImgTrofeu(''); setNameTrofeu(''); setName(''); setEscudo('');
    setCamisa(''); setAnoTitulo(''); setArtilheiro(''); setAssistencia('');
    setIdTituloIndividual(''); setIdCup('');
  }

  // == SALVAR TÍTULO == == SALVAR TÍTULO == == SALVAR TÍTULO == == SALVAR TÍTULO == == SALVAR TÍTULO ==
  async function handleSaveTitulo(event: FormEvent) {
    event.preventDefault()

    await addDoc(collection(db, 'titulos'), {
      idTime: idTime,
      imgTrofeu: imgTrofeu,
      nameTrofeu: nameTrofeu,
      nameTime: name,
      escudoTime: escudo,
      camisaTime: camisa,
      anoTitulo: anoTitulo,
      artilheiro: artilheiro,
      assistencia: assistencia
    })

    defaultUseStates()
    router.push('/Dashboard')
  }

  // == SALVAR TIME == == SALVAR TIME == == SALVAR TIME == == SALVAR TIME == == SALVAR TIME ==
  async function handleSaveTime(event: FormEvent) {
    event.preventDefault()

    await addDoc(collection(db, 'times'), {
      idCup: idCup,
      name: name,
      escudo: escudo,
      camisa: camisa
    })

    defaultUseStates()
    router.push('/Dashboard')
  }

  // == SALVAR TITULO INDIVIDUAL == == SALVAR TITULO INDIVIDUAL == == SALVAR TITULO INDIVIDUAL == == SALVAR TITULO INDIVIDUAL ==
  async function handleSaveIndividuais(event: FormEvent) {
    event.preventDefault()

    await addDoc(collection(db, 'titulosIndividuais'), {
      nameTime: name,
      escudoTime: escudo,
      camisaTime: camisa,
      idTrofeuIndividual: idTituloIndividual,
      anoTitulo: anoTitulo
    })

    defaultUseStates()
    router.push('/Dashboard')
  }

}

export const getServerSideProps: GetServerSideProps = async () => {
  const campeonatoRef = query(collection(db, 'campeonatos'), orderBy("name", 'asc'))
  const snapshotCups = await getDocs(campeonatoRef)

  let campeonatos: CampeonatosProps[] = []
  snapshotCups.forEach(doc => {
    campeonatos.push({
      id: doc.id,
      name: doc.data().name,
      logo: doc.data().logo
    })
  })

  return {
    props: {
      campeonatosProps: campeonatos
    }
  }
}
