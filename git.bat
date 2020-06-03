Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.157.140:6443 --token wq7h8h.vfoot00w391g9qyu \
    --discovery-token-ca-cert-hash sha256:7b4bbd0acda9f3f0ad1c3590243e7eff1c4f2a8b19d1ef7138aa5497c145d7c5 