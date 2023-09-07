const createContainerNamespaces = (namespace: string) => {
  // unshare -fpuimns --mount-proc=${namespace} /bin/bash
}

const createContainerCgroup = (cpu: string, memory: string) => {
  // mkdir /sys/fs/cgroup/container
  // echo $string > /sys/fs/cgroup/container/cpu.shares
  // echo "$memory > /sys/fs/cgroup/container/memory.limit_in_bytes
}

const createContainerFilesystem = (path: string) => {
  // mkdir /$path
}

const containerLogs = (namespace: string) => {
  // nsenter --target $namespace --mount --uts --ipc --net --pid cat /var/log/container.log
}

const configureContainerNetwork = (network: string) => {
  // ip netns add $network
  // ip netns exec $network ip addr add 192.168.1.2/24 dev eth0
  // ip netns exec $network ip link set eth0 up
  // here we can modify routes, dns, ips range, subnets etc.
}

const executeContainerProcess = (command: string, namespace: string) => {
 // nsenter --target $namespace --mount --uts --ipc --net --pid $command`
}

const cleanupContainerResources = (namespace: string, cgroup: string) => {
  // rmdir /sys/fs/cgroup/container`
  // nsenter --target $namespace --mount --uts --ipc --net --pid -- /bin/bash -c "exit"
}

const main = () => {
  const containerNamespace = "my_container_namespace"
  const containerCgroupCpu = "100"
  const containerCgroupMemory = "512M"
  const containerFilesystemPath = "/my_container_root"
  const containerNetwork = "my_container_network"

  try {
    createContainerNamespaces(containerNamespace);

    createContainerCgroup(containerCgroupCpu, containerCgroupMemory)
    
    configureContainerNetwork(containerNetwork)    
    
    createContainerFilesystem(containerFilesystemPath)

    containerLogs(containerNamespace)

    cleanupContainerResources(containerNamespace, "container")
  } catch (error) {
    console.error(`Container error: ${error}`)
  }
}
