import Header from '@/components/Header'
import React, { useState, useEffect } from 'react'
import capa from '../../../../public/assets/images/Instagram-Post-Ideas.png'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { GetServerSideProps } from 'next'

import { db, storage } from '@/services/firebaseConnection'
import { query, collection, orderBy, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


interface PostProps {
  campeonatosProps: CampeonatosProps[],
}

export default function PostPhoto({ campeonatosProps }: PostProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true); const [btnSalvar, setBtnSalvar] = useState("Salvar")
  const [imgURL, setImgURL] = useState('')
  const [idCup, setIdCup] = useState('');
  const [localizacao, setLocalizacao] = useState(''); const [curtidas, setCurtidas] = useState(''); const [descricao, setDescricao] = useState(''); const [created, setCreated] = useState(''); const [indice, setIndice] = useState('')
  const [seguidores, setseguidores] = useState(''); const [seguindo, setseguindo] = useState(''); const [camisa, setcamisa] = useState(''); const [instagramTime, setinstagramTime] = useState(''); const [descSelecao, setdescSelecao] = useState(''); const [descOpcional, setdescOpcional] = useState(''); const [fotoPerfil, setFotoPerfil] = useState('');

  useEffect(() => {
    if (imgURL !== '') handleSavePost();
  }, [imgURL])

  function handleUpload(event: any) {
    event.preventDefault()
    setLoading(false)

    const file = event.target[0]?.files[0]
    if (!file) return;

    const storageRef = ref(storage, `instagram/${file.name}`)
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
          setImgURL(url)
        })
      }
    )
  }

  async function handleSavePost() {
    const data = created
    const dataPost = new Date(data).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    await addDoc(collection(db, 'instagram'), {
      localizacao: localizacao,
      curtidas: curtidas,
      descricao: descricao,
      datapost: dataPost,
      imgURL: imgURL,
      created: created,
      indice: indice
    })

    setLoading(true)
    setBtnSalvar('Salvo!')
    router.push('/Instagram')
  }

  async function handleSavePerfil() {
    const perfilRef = query(collection(db, 'perfilInstagram'))
    const snapshotPerfil = await getDocs(perfilRef)

    let idPerfil = ''
    snapshotPerfil.forEach(doc => {
      idPerfil = doc.id
    })

    const editRef = doc(db, 'perfilInstagram', idPerfil)
    await updateDoc(editRef, {
      idCup: idCup,
      seguidores: seguidores,
      seguindo: seguindo,
      camisa: camisa,
      instagramTime: instagramTime,
      descSelecao: descSelecao,
      descOpcional: descOpcional,
      foto: fotoPerfil
    })

    onClose()
  }

  async function updateStates() {
    const updateRef = query(collection(db, 'perfilInstagram'))
    const snapshotUpdate = await getDocs(updateRef)

    snapshotUpdate.forEach(doc => {
      setseguidores(doc.data().seguidores),
        setseguindo(doc.data().seguindo),
        setcamisa(doc.data().camisa),
        setinstagramTime(doc.data().instagramTime),
        setdescSelecao(doc.data().descSelecao),
        setdescOpcional(doc.data().descOpcional),
        setFotoPerfil(doc.data().foto)
    })
  }

  return (
    <div className='bg-[#111]'>
      <header>
        <title>Postagem de foto</title>
      </header>

      <Header imgSrc={capa as any} imgAlt='Capa' width={400} height={100} title='Post de Fotos' />

      <Link href={'/Instagram'} className='absolute top-3 left-3 text-white'>
        <FaArrowLeft size={28} />
      </Link>

      <div className='h-[10vh] bg-gradient-to-t from-[#111] to-[#000]' />

      <main className='flex flex-col w-full px-4 overflow-scroll h-[70vh] bg-gradient-to-t from-[#696969] to-[#111]'>
        <Button onPress={() => (updateStates(), onOpen())} className='border-3 border-white bg-gray-600 text-xl text-white font-bold py-5 mt-4'>Editar cabeçalho</Button>

        <Input value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Localização</p>} variant='flat' className='mt-4' style={{ fontSize: 18, color: '#000' }} />
        <Input value={curtidas} onChange={(e) => setCurtidas(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Número de curtidas</p>} variant='flat' className='mt-4' style={{ fontSize: 18, color: '#000' }} />
        <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Descrição</p>} variant='flat' className='mt-4' style={{ fontSize: 18, color: '#000' }} />
        <Input value={indice} onChange={(e) => setIndice(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Indice da foto</p>} variant='flat' className='mt-4' style={{ fontSize: 18, color: '#000' }} />
        <Input value={created} onChange={(e) => setCreated(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Data do Post (2023/1/10)</p>} variant='flat' className='mt-4' style={{ fontSize: 18, color: '#000' }} />

        <form onSubmit={handleUpload}>
          <input type="file" className='bg-gray-500 mt-4 px-2 py-4 text-white font-semibold rounded-xl w-[90vw]' />

          {loading && (
            <div className='grid justify-items-end my-4'>
              <Button color='success' type='submit' className='text-white text-xl font-bold px-16'>{btnSalvar}</Button>
            </div>
          )}
        </form>
        {!loading && (
          <div className='grid justify-items-end my-4'>
            <Button isLoading color='success' className='text-white text-xl font-bold px-9'>Salvando</Button>
          </div>
        )}
      </main>

      {/* == EDIÇÃO DOS DADOS DO PERFIL == == EDIÇÃO DOS DADOS DO PERFIL == == EDIÇÃO DOS DADOS DO PERFIL == */}
      <Modal
        size='full'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className='overflow-scroll bg-gray-200'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1  bg-gray-500">
                <h1 className='text-xl text-white'>Editar dados do perfil:</h1>
              </ModalHeader>
              <ModalBody>
                <Select
                  label={<p className='text-[#7a7a7a]'>Selecione o campeonato</p>}
                  size='lg'
                  variant='flat'
                  style={{ color: '#000' }}
                  className='mt-4'
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

                <Input value={seguidores} onChange={(e) => setseguidores(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Seguidores</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={seguindo} onChange={(e) => setseguindo(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Seguindo</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={camisa} onChange={(e) => setcamisa(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Número da camisa</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={instagramTime} onChange={(e) => setinstagramTime(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>@ do Time</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={descSelecao} onChange={(e) => setdescSelecao(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Descrição seleção</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={descOpcional} onChange={(e) => setdescOpcional(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>Descrição opcional</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />
                <Input value={fotoPerfil} onChange={(e) => setFotoPerfil(e.target.value)} size='lg' label={<p className='text-[#7a7a7a]'>URL foto do perfil</p>} variant='flat' className='mt-1' style={{ fontSize: 18, color: '#000' }} />

              </ModalBody>
              <ModalFooter>
                <Button className='text-xl' color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button className='text-white text-xl' color="success" onPress={() => (handleSavePerfil())}>
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div >
  )
}

type CampeonatosProps = {
  id: string;
  name: string;
  logo: string;
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
